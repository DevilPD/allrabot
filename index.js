const Discord = require('discord.js');
const https = require('https');
const champ = require('./champ.json');
const client = new Discord.Client();

function searching(champ)
{
    if( champ == "가렌") {
        return garen
    }
}

function getriotinfo_1(playername, i) //data_split_GID_넘버_2[i] i = 1, 9, 17, 25 ... 이렇게 gameID임 그리고 넘버는 getrioninfo_"숫자"<여기
{
    
    if( i == 1 ) {            // <- 위에 i = 1, 9, 17, 25.. 를 1, 2, 3, 4 로 표현할수있음
        var i_C = i;
    }
    else if( ii > 1 ) {
        var i_C = 8 * i - 7; 
    }

    var url_AC_1 = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playername + "?api_key=" + api_key
    var UTFurl_AC_1 = encodeURI(url_AC_1);
    https.get(UTFurl_AC_1, (resp) => {
        let data_AC_1 = '';

        resp.on('data', (chunk) => {
            data_AC_1 += chunk;
        });

        resp.on('end', () => {
            var data_split_AC_1_1 = data_AC_1.split(',')
            var data_split_AC_1_2 = data_split_AC_1_1[1].split(':')
            var data_replace_AC_1_3 = data_split_AC_1_2[1].replace(/\"/g, "");
            var url_GID_1 = "https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/" + data_replace_AC_1_3 + "?api_key=" + api_key
            var UTFurl_GID_1 = encodeURI(url_GID_1);
            https.get(UTFurl_GID_1, (resp) => {
                let data_GID_1 = '';
     
                resp.on('data', (chunk) => {
                    data_GID_1 += chunk;
                });
                
                resp.on('end', () => {

                    var data_split_GID_1_1 = data_GID_1.split(',')
                    var data_split_GID_1_2 = data_split_GID_1_1[i_C].split(':')
                    var url_INFO_1 = "https://kr.api.riotgames.com/lol/match/v4/matches/" + data_split_GID_1_2[1] + "?api_key=" + api_key // data_split_GID_1 부터 args[i] i = 1, 9, 17, 25 ... 이렇게 gameID
                    var UTFurl_INFO_1 = encodeURI(url_INFO_1);

                    https.get(UTFurl_INFO_1, (resp) => {
                        let data_INFO_1 = '';

                        resp.on('data', (chunk) => {
                            data_INFO_1 += chunk;
                        });

                        resp.on('end', () => {
                            var data_replace_INFO_1_1 = data_INFO_1.replace(/\{/g, "")
                            var data_replace_INFO_1_2 = data_replace_INFO_1_1.replace(/\}/g, "")
                            var data_replace_INFO_1_3 = data_replace_INFO_1_2.replace(/\[/g, "")
                            var data_replace_INFO_1_4 = data_replace_INFO_1_3.replace(/\]/g, "")
                            var data_replace_INFO_1_5 = data_replace_INFO_1_4.replace(/\"/g, "")
                            var data_split_INFO_1_1 = data_replace_INFO_1_5.split(',')
                            var number_indexOF_1_FT = 'participantIdentities';
                            var number_index_1_FT = data_replace_INFO_1_5.indexOf(number_indexOF_1_FT) + 22;
                            var number_indexOF_1_LT = 'profileIcon';
                            var number_index_1_LT = data_replace_INFO_1_5.indexOf(number_indexOF_1_LT);
                            var result_1 = data_replace_INFO_1_5.substr(number_index_1_FT, number_index_1_LT);
                            // var result_1_split_1_1 = result_1.split(',') <- participantIdentities List // console.log(result_1_split_1_1);
                            if(number_index_1_FT != -1 && number_index_1_LT != -1){
                                var number_indexOF_2_LT = data_replace_AC_1_3;
                                var number_index_2_LT = result_1.indexOf(number_indexOF_2_LT);
                                var result_2 = result_1.substr(number_index_2_LT - 47, number_index_2_LT);
                                var result_2_split_1_1 = result_2.split(',')
                                console.log(result_2_split_1_1[0]); // 요청한 플레이어의 participantID
                                var number_indexOF_1_PT = 'participants';
                                var number_index_1_PT = data_replace_INFO_1_5.indexOf(0,number_indexOF_1_PT);
                                console.log(number_index_1_PT);
                            }
                            else {
                                console.log("실패!");
                            }
                            // console.log(data_split_INFO_1_1[0]);
                            // console.log(data_split_INFO_1_2);
                            // console.log(data_split_INFO_1_1);
                            // console.log(number_index);
                            
                        });
                    }).on('error', (err) => {
                        console.log('Error: ' + err.message)
                    })
                });
            }).on('error', (err) => {
                console.log('Error: ' + err.message)
            });
        });
    }).on('error', (err) => {
        console.log('Error: ' + err.message)
    })
}

client.once('ready', () => {
    console.log("");
    console.log("");
    console.log("                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("                 @                                 @");
    console.log("                 @          [ARBOT] Start          @");
    console.log("                 @                                 @");
    console.log("                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("");
    console.log("                          제작자 : 원호영");
    client.user.setActivity(' !!명령어 | 진화', { type : 'PLAYING'});
    client.guilds.cache.get("308931109067030530").channels.cache.get("308931109067030530").send("디코봇이 활성화되었습니다.");
});

 // 

client.on('guildMemberAdd', member => {
    let server = client.guilds.cache.get("432327121000595466")
    var memberRole= server.roles.cache.find(role => role.name === "뉴비")
    member.roles.add(memberRole);    
});
client.on('message', message => {
    const args = message.content.split(" "); 
    const emb_BD = new Discord.MessageEmbed() // 공지
    .setColor('#0099ff')
    .setTitle('본인인증방법')
    .addFields(
        { name: '!!인증 <본명>', value: 'ex) !!인증 호영'},
        { name: '꼭! 본명으로 해주세요', value: '안할시 생기는 불이익은 책임지지 않습니다.'},
    );
    // { name: '\u200B', value: '\u200B' },        // 빈칸만들기
    const emb_HELP = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('명령어')
    .setDescription('올라봇의 명령어 모음!!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!마크', value: '마크 관련 명령어들'},
        { name: '!!롤', value: '곧 추가예정'},
        { name: '!!기능', value: '그 외 명령어들'},
    );
    const emb_HELP_MINECRAFT = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('명령어')
    .setDescription('올라봇의 마크 명령어!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!서버주소', value: '서버주소를 알려드립니다.'},
        { name: '!!모드사이트', value: '마크 모드사이트를 알려드립니다.'},
        { name: '!!플긴사이트', value: '마크 플러그인사이트를 알려드립니다.'},
        { name: '!!모드버킷', value: '모드버킷(CatServer) 다운로드 사이트를 알려드립니다.'},
        { name: '!!모드다운', value: '이번에 진행할 서버의 모드팩(포지포함)을 다운로드합니다.'},
        { name: '!!모드종류', value: '이번에 진행할 서버의 모드팩의 정보를 알려드립니다.'},
    );
    const emb_ft = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('기능')
    .setDescription('올라봇의 기능 명령어!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!팀뷰어', value: '팀뷰어 다운로드 사이트를 알려드립니다.'},
    );
    const emb_info_MINECRAFT = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('모드종류')
    .setDescription('올라봇이 알려주는 모드종류!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'AbyssalCraft ', value: '크툴루 신화 기반 모드! 새로운 보스와 맵!'},
        { name: 'Applied Energistics 2 ', value: '무선스토리지. 마크 내의 웹하드'},
        { name: 'BiblioCraft  ', value: '가구모드.'},
        { name: 'chiselsandbit  ', value: '조각모드 ( 혹은 치즐모드라고도 한다 ).'},
        { name: 'ComputerCraft  ', value: '마크내에서 코딩할수있다!'},
        { name: 'EnderStorage', value: '산업모드를 서포트하기위해 추가했다.'},
        { name: 'extrautils2 ', value: '산업모드를 서포트하기위해 추가했다.'},
        { name: 'industrialforegoing', value: '공장모드. 다양한 아이템.심지어 엔티티까지 생산해낼수 있다.'},
        { name: 'StevesCarts', value: '이것도한 자동화모드 다양한 응용이 가능하다.'},
        { name: 'TConstruct', value: '지금까지의 아이템은 잊어라! 새로운 조합법과 새로운 아이템들.'},
        { name: 'Thaumcraft', value: '마크에서 마법을 써보자!'},
        { name: 'Draconic-Evolution', value: '새로운 에너지! 새로운 아이템!'},
        { name: 'industrialcraft', value: '마크 기술모드의 정점 산업모드!'},
        { name: 'ThermalExpansion', value: '산업모드를 서포트하기 위한 파이프 외 등등.'},
        
    );

/*     setInterval(() => {
        const date = new Date(); // today
        if (date.getHours() === 16 && date.getMinutes() === 5) {
          const targetChannel = message.guild.channels.cache.get(HY_ADMINROOM_ID);
          if (targetChannel)
            targetChannel
            .send('**Hello**')
            .then((m) => {
              m.delete(86400000);
            })
            .then((m) => {
              m.edit('Editing...');
            });
          message.channel.send('Hello');
        }
      }, 60000); // check every minute */

    if(args[0] === `!!FT`) {             //function test
      getriotinfo_1(args[1], 1);
    }
    else if(args[0] === `!!명령어`) {             //function test
          message.channel.send(emb_HELP);
    }
    else if(args[0] === `!!셋`) {             //function test
        message.channel.send(emb_BD);
    }
    else if(args[0] === `!!이름`) {             //function test
        message.member.setNickname(args[1]);
  }
    else if(args[0] === `!!호영권한`) {
        let server = client.guilds.cache.get("432327121000595466")
        let member = server.members.cache.get(message.author.id)             //function test
        var memberRole3= server.roles.cache.find(role => role.name === "엔지니어")
        member.roles.add(memberRole3);
        message.delete();
    }
    else if(args[0] === `!!호영권한해제`) {             //function test
        if(message.member.roles.cache.has('767059367970865213')) { // 특정 역할 가지고있을시 행동
            let server = client.guilds.cache.get(PP_GUILD_ID)
            let member = server.members.cache.get(message.author.id)
            var memberRole5= server.roles.cache.find(role => role.name === "엔지니어")
            var memberRole6= server.roles.cache.find(role => role.name === "뉴비")
            member.roles.add(memberRole6);
            member.roles.remove(memberRole5);
            message.delete();
          } else {
            message.channel.send("이 명령어는 엔지니어만 가능합니다");
          }
  }
    else if(args[0] === `!!인증`) {             //function test
        let server = client.guilds.cache.get("432327121000595466")
        let member = server.members.cache.get(message.author.id)
        var memberRole1= server.roles.cache.find(role => role.name === "즐거운 게이머들!")
        var memberRole2= server.roles.cache.find(role => role.name === "뉴비")
        member.roles.add(memberRole1);
        member.roles.remove(memberRole2);
        message.member.setNickname(args[1]);
        message.delete();
  }
    // else if(args[0] === `!!역할`) {           
    //     if(message.member.roles.cache.has('역할ID')) { // 특정 역할 가지고있을시 행동
    //         console.log(`Yay, the author of the message has the role!`);
    //       } else {
    //         console.log(`Nope, noppers, nadda.`);
    //       }
    // }
    else if(args[0] === `!!마크`) {             //function test
        message.channel.send(emb_HELP_MINECRAFT);
    } 
    else if(args[0] === `!!기능`) {             //function test
        message.channel.send(emb_ft);
    }
    else if(args[0] == `!!모드사이트`) {
        message.channel.send("https://www.curseforge.com/minecraft/mc-mods?filter-game-version=2020709689%3A6756&filter-sort=4");
    }
    else if(args[0] == `!!플긴사이트`) {
        message.channel.send("https://dev.bukkit.org/bukkit-plugins?filter-game-version=2020709689%3A7915&filter-sort=4");
    }
    //  
    else if(args[0] == `!!모드버킷`) {
        message.channel.send("https://github.com/Luohuayu/CatServer/blob/1.12.2/README_EN.md");
    }
    else if(args[0] == `!!팀뷰어`) {
        message.channel.send("https://www.teamviewer.com/ko/teamviewer-automatic-download/?utm_source=google&utm_medium=cpc&utm_campaign=kr%7Cb%7Cpr%7C20%7Cjun%7Cexact-brand-only-sn%7Cfree%7Ct0%7C0&utm_content=exact_Brand-only&utm_term=teamviewer");
    }
    else if(args[0] == `!!서버주소`) {
        message.channel.send("서버주소는 www.ghdud4869.kro.kr 입니다!");
    }
    else if(args[0] == `!!모드다운`) {
        message.channel.send("https://drive.google.com/file/d/1Xk57YpvxGn3Bl3Sq_ORli68vjodSi3HC/view?usp=sharing");
        message.channel.send("버전은 1.12.2 입니다.");
    }
    else if(args[0] == `!!추가모드`) {
        message.channel.send("https://drive.google.com/file/d/11_m3S8yWCQAo13MAhUh8X4wezMnDUu1U/view?usp=sharing");
    }
    else if(args[0] == `!!모드종류`) {
        message.channel.send(emb_info_MINECRAFT);
    }
    else if(args[0] === `!!say`) {
        // var nm = args[1];
        message.channel.send(champ.가렌)
    }
    else if(args[0] === `!!FTT`) {             //function test
        if(args[1] === `가렌`) {
            message.channel.send("https://www.op.gg/champion/garen/statistics/");
        }
        else if(args[1] === `갈리오`) {
            message.channel.send("https://www.op.gg/champion/galio/statistics/")
        }
        else if(args[1] === `갱플랭크`) {
            message.channel.send()
        }
        else if(args[1] === `그라가스`) {
            message.channel.send()
        }
        else if(args[1] === `나르`) {
            message.channel.send()
        }
        else if(args[1] === `나미`) {
            message.channel.send()
        }
        else if(args[1] === `나서스`) {
            message.channel.send()
        }
        else if(args[1] === `노틸러스`) {
            message.channel.send()
        }
        else if(args[1] === `녹턴`) {
            message.channel.send()
        }
        else if(args[1] === `누누`) {
            message.channel.send()
        }
        else if(args[1] === `니달리`) {
            message.channel.send()
        }
        else if(args[1] === `니코`) {
            message.channel.send()
        }
        else if(args[1] === `다리우스`) {
            message.channel.send()
        }
        else if(args[1] === `다이애나`) {
            message.channel.send()
        }
        else if(args[1] === `드레이븐`) {
            message.channel.send()
        }
        else if(args[1] === `라이즈`) {
            message.channel.send()
        }
        else if(args[1] === `라칸`) {
            message.channel.send()
        }
        else if(args[1] === `람머스`) {
            message.channel.send()
        }
        else if(args[1] === `럭스`) {
            message.channel.send()
        }
        else if(args[1] === `럼블`) {
            message.channel.send()
        }
        else if(args[1] === `레넥톤`) {
            message.channel.send()
        }
        else if(args[1] === `렉사이`) {
            message.channel.send()
        }
        else if(args[1] === `렝가`) {
            message.channel.send()
        }
        else if(args[1] === `루시안`) {
            message.channel.send()
        }
        else if(args[1] === `룰루`) {
            message.channel.send()
        }
        else if(args[1] === `르블랑`) {
            message.channel.send()
        }
        else if(args[1] === `리신`) {
            message.channel.send()
        }
        else if(args[1] === `리븐`) {
            message.channel.send()
        }
        else if(args[1] === `리산드라`) {
            message.channel.send()
        }
        else if(args[1] === `마스터이`) {
            message.channel.send()
        }
        else if(args[1] === `마오카이`) {
            message.channel.send()
        }
        else if(args[1] === `말자하`) {
            message.channel.send()
        }
        else if(args[1] === `말파이트`) {
            message.channel.send()
        }
        else if(args[1] === `모데카이저`) {
            message.channel.send()
        }
        else if(args[1] === `모르가나`) {
            message.channel.send()
        }
        else if(args[1] === `문도박사`) {
            message.channel.send()
        }
        else if(args[1] === `미스포츈`) {
            message.channel.send()
        }
        else if(args[1] === `바드`) {
            message.channel.send()
        }
        else if(args[1] === `바루스`) {
            message.channel.send()
        }
        else if(args[1] === `바이`) {
            message.channel.send()
        }
        else if(args[1] === `베이가`) {
            message.channel.send()
        }
        else if(args[1] === `베인`) {
            message.channel.send()
        }
        else if(args[1] === `벨코즈`) {
            message.channel.send()
        }
        else if(args[1] === `볼리베어`) {
            message.channel.send()
        }
        else if(args[1] === `브라움`) {
            message.channel.send()
        }
        else if(args[1] === `브랜드`) {
            message.channel.send()
        }
        else if(args[1] === `블라디미르`) {
            message.channel.send("https://www.op.gg/champion/vladimir/statistics/")
        }
        else if(args[1] === `블츠`) {
            message.channel.send("https://www.op.gg/champion/blitzcrank/statistics/")
        }
        else if(args[1] === `빅토르`) {
            message.channel.send("https://www.op.gg/champion/viktor/statistics/")
        }
        else if(args[1] === `뽀삐`) {
            message.channel.send("https://www.op.gg/champion/poppy/statistics/")
        }
        else if(args[1] === `사이온`) {
            message.channel.send("https://www.op.gg/champion/sion/statistics/")
        }
        else if(args[1] === `사일러스`) {
            message.channel.send("https://www.op.gg/champion/sylas/statistics/")
        }
        else if(args[1] === `샤코`) {
            message.channel.send("https://www.op.gg/champion/shaco/statistics/")
        }
        else if(args[1] === `세나`) {
            message.channel.send("https://www.op.gg/champion/senna/statistics/")
        }
        else if(args[1] === `세주아니`) {
            message.channel.send("https://www.op.gg/champion/sejuani/statistics/")
        }
        else if(args[1] === `세트`) {
            message.channel.send("https://www.op.gg/champion/sett/statistics/")
        }
        else if(args[1] === `소나`) {
            message.channel.send("https://www.op.gg/champion/sona/statistics/")
        }
        else if(args[1] === `소라카`) {
            message.channel.send("https://www.op.gg/champion/soraka/statistics/")
        }
        else if(args[1] === `쉔`) {
            message.channel.send("https://www.op.gg/champion/shen/statistics/")
        }
        else if(args[1] === `쉬바나`) {
            message.channel.send("https://www.op.gg/champion/shyvana/statistics/")
        }
        else if(args[1] === `스웨인`) {
            message.channel.send("https://www.op.gg/champion/swain/statistics/")
        }
        else if(args[1] === `스카너`) {
            message.channel.send("https://www.op.gg/champion/skarner/statistics/")
        }
        else if(args[1] === `시비르`) {
            message.channel.send("https://www.op.gg/champion/sivir/statistics/")
        }
        else if(args[1] === `신짜오`) {
            message.channel.send("https://www.op.gg/champion/xinzhao/statistics/")
        }
        else if(args[1] === `신드라`) {
            message.channel.send("https://www.op.gg/champion/syndra/statistics/")
        }
        else if(args[1] === `신지드`) {
            message.channel.send("https://www.op.gg/champion/singed/statistics/")
        }
        else if(args[1] === `쓰레쉬`) {
            message.channel.send("https://www.op.gg/champion/thresh/statistics/")
        }
        else if(args[1] === `아리`) {
            message.channel.send("https://www.op.gg/champion/ahri/statistics/")
        }
        else if(args[1] === `아무무`) {
            message.channel.send("https://www.op.gg/champion/amumu/statistics/")
        }
        else if(args[1] === `아우솔`) {
            message.channel.send("https://www.op.gg/champion/aurelionsol/statistics/")
        }
        else if(args[1] === `아이번`) {
            message.channel.send("https://www.op.gg/champion/ivern/statistics/")
        }
        else if(args[1] === `아지르`) {
            message.channel.send("Run, https://www.op.gg/champion/azir/statistics/")
        }
        else if(args[1] === `아칼리`) {
            message.channel.send("https://www.op.gg/champion/akali/statistics/")
        }
        else if(args[1] === `아트록스`) {
            message.channel.send("https://www.op.gg/champion/aatrox/statistics/")
        }
        else if(args[1] === `아펠리오스`) {
            message.channel.send("https://www.op.gg/champion/aphelios/statistics/")
        }
        else if(args[1] === `알리스타`) {
            message.channel.send("https://www.op.gg/champion/alistar/statistics/")
        }
        else if(args[1] === `애니`) {
            message.channel.send("https://www.op.gg/champion/annie/statistics/")
        }
        else if(args[1] === `애니비아`) {
            message.channel.send("https://www.op.gg/champion/anivia/statistics/")
        }
        else if(args[1] === `애쉬`) {
            message.channel.send("https://www.op.gg/champion/ashe/statistics/")
        }
        else if(args[1] === `야스오`) {
            message.channel.send("https://www.op.gg/champion/yasuo/statistics/")
        }
        else if(args[1] === `에코`) {
            message.channel.send("https://www.op.gg/champion/ekko/statistics/")
        }
        else if(args[1] === `엘리스`) {
            message.channel.send("https://www.op.gg/champion/elise/statistics/")
        }
        else if(args[1] === `오공`) {
            message.channel.send("https://www.op.gg/champion/monkeyking/statistics/") // 475 번줄
        }
        else if(args[1] === `오른`) {
            message.channel.send("https://www.op.gg/champion/ornn/statistics/")
        }
        else if(args[1] === `오리아나`) {
            message.channel.send("https://www.op.gg/champion/orianna/statistics/")
        }
        else if(args[1] === `올라프`) {
            message.channel.send("https://www.op.gg/champion/olaf/statistics/")
        }
        else if(args[1] === `요릭`) {
            message.channel.send("https://www.op.gg/champion/yorick/statistics/")
        }
        else if(args[1] === `우디르`) {
            message.channel.send("https://www.op.gg/champion/Udyr/statistics/")
        }
        else if(args[1] === `우르곳`) {
            message.channel.send("https://www.op.gg/champion/urgot/statistics/")
        }
        else if(args[1] === `워윅`) {
            message.channel.send("https://www.op.gg/champion/warwick/statistics/")
        }
        else if(args[1] === `유미`) {
            message.channel.send("https://www.op.gg/champion/yuumi/statistics/")
        }
        else if(args[1] === `이렐리아`) {
            message.channel.send("https://www.op.gg/champion/irelia/statistics/")
        }
        else if(args[1] === `이블린`) {
            message.channel.send("https://www.op.gg/champion/evelynn/statistics/")
        }
        else if(args[1] === `이즈리얼`) {
            message.channel.send("https://www.op.gg/champion/ezreal/statistics/")
        }
        else if(args[1] === `일라오이`) {
            message.channel.send("https://www.op.gg/champion/illaoi/statistics/")
        }
        else if(args[1] === `자르반4세`) {
            message.channel.send("https://www.op.gg/champion/jarvaniv/statistics/")
        }
        else if(args[1] === `자야`) {
            message.channel.send("https://www.op.gg/champion/xayah/statistics/")
        }
        else if(args[1] === `자이라`) {
            message.channel.send("https://www.op.gg/champion/zyra/statistics/")
        }
        else if(args[1] === `자크`) {
            message.channel.send("https://www.op.gg/champion/zac/statistics/")
        }
        else if(args[1] === `잔나`) {
            message.channel.send("https://www.op.gg/champion/janna/statistics/")
        }
        else if(args[1] === `잭스`) {
            message.channel.send(" https://www.op.gg/champion/jax/statistics/")
        }
        else if(args[1] === `제드`) {
            message.channel.send("https://www.op.gg/champion/zed/statistics/")
        }
        else if(args[1] === `제라스`) {
            message.channel.send("https://www.op.gg/champion/xerath/statistics/")
        }
        else if(args[1] === `조이`) {
            message.channel.send("https://www.op.gg/champion/zoe/statistics/")
        }
        else if(args[1] === `직스`) {
            message.channel.send("https://www.op.gg/champion/ziggs/statistics/")
        }
        else if(args[1] === `진`) {
            message.channel.send("https://www.op.gg/champion/jhin/statistics/")
        }
        else if(args[1] === `질리언`) {
            message.channel.send("https://www.op.gg/champion/zilean/statistics/")
        }
        else if(args[1] === `징크스`) {
            message.channel.send("https://www.op.gg/champion/jinx/statistics/")
        }
        else if(args[1] === `초가스`) {
            message.channel.send("https://www.op.gg/champion/chogath/statistics/")
        }
        else if(args[1] === `카르마`) {
            message.channel.send("https://www.op.gg/champion/karma/statistics/")
        }
        else if(args[1] === `카밀`) {
            message.channel.send("https://www.op.gg/champion/camille/statistics/")
        }
        else if(args[1] === `카사딘`) {
            message.channel.send("https://www.op.gg/champion/kassadin/statistics/")
        }
        else if(args[1] === `카서스`) {
            message.channel.send("https://www.op.gg/champion/karthus/statistics/")
        }
        else if(args[1] === `카시오페아`) {
            message.channel.send("https://www.op.gg/champion/cassiopeia/statistics/")
        }
        else if(args[1] === `카이사`) {
            message.channel.send("https://www.op.gg/champion/kaisa/statistics/")
        }
        else if(args[1] === `카직스`) {
            message.channel.send("https://www.op.gg/champion/khazix/statistics/")
        }
        else if(args[1] === `카타리나`) {
            message.channel.send("https://www.op.gg/champion/katarina/statistics/")
        }
        else if(args[1] === `칼리스타`) {
            message.channel.send("https://www.op.gg/champion/kalista/statistics/")
        }
        else if(args[1] === `케넨`) {
            message.channel.send("https://www.op.gg/champion/kennen/statistics/")
        }
        else if(args[1] === `케이틀린`) {
            message.channel.send("https://www.op.gg/champion/caitlyn/statistics/")
        }
        else if(args[1] === `케인`) {
            message.channel.send("https://www.op.gg/champion/kayn/statistics/")
        }
        else if(args[1] === `케일`) {
            message.channel.send("https://www.op.gg/champion/kayle/statistics/")
        }
        else if(args[1] === `코그모`) {
            message.channel.send("https://www.op.gg/champion/kogmaw/statistics/")
        }
        else if(args[1] === `코르키`) { 
            message.channel.send("https://www.op.gg/champion/corki/statistics/")
        }
        else if(args[1] === `퀸`) {
            message.channel.send("https://www.op.gg/champion/quinn/statistics/")
        }
        else if(args[1] === `클레드`) { //////////////// 650번 줄
            message.channel.send("https://www.op.gg/champion/kled/statistics/")
        }
        else if(args[1] === `키아나`) {
            message.channel.send("https://www.op.gg/champion/qiyana/statistics/")
        }
        else if(args[1] === `킨드레드`) {
            message.channel.send("https://www.op.gg/champion/kindred/statistics/")
        }
        else if(args[1] === `타릭`) {
            message.channel.send("https://www.op.gg/champion/taric/statistics/")
        }
        else if(args[1] === `탈론`) {
            message.channel.send("https://www.op.gg/champion/talon/statistics/")
        }
        else if(args[1] === `탈리야`) {
            message.channel.send("https://www.op.gg/champion/taliyah/statistics/")
        }
        else if(args[1] === `탐켄치`) {
            message.channel.send("https://www.op.gg/champion/tahmkench/statistics/")
        }
        else if(args[1] === `트런들`) {
            message.channel.send("https://www.op.gg/champion/trundle/statistics/")
        }
        else if(args[1] === `트리스타나`) {
            message.channel.send("https://www.op.gg/champion/tristana/statistics/")
        }
        else if(args[1] === `트린다미어`) {
            message.channel.send("https://www.op.gg/champion/tryndamere/statistics/")
        }
        else if(args[1] === `트페`) {
            message.channel.send("https://www.op.gg/champion/twistedfate/statistics/")
        }
        else if(args[1] === `트위치`) {
            message.channel.send("https://www.op.gg/champion/twitch/statistics/")
        }
        else if(args[1] === `티모`) {
            message.channel.send("https://www.op.gg/champion/teemo/statistics/")
        }
        else if(args[1] === `파이크`) {
            message.channel.send("https://www.op.gg/champion/pyke/statistics/")
        }
        else if(args[1] === `판테온`) {
            message.channel.send("https://www.op.gg/champion/pantheon/statistics/")
        }
        else if(args[1] === `피들스틱`) {
            message.channel.send("https://www.op.gg/champion/fiddlesticks/statistics/")
        }
        else if(args[1] === `피오라`) {
            message.channel.send("https://www.op.gg/champion/fiora/statistics/")
        }
        else if(args[1] === `피즈`) {
            message.channel.send("https://www.op.gg/champion/fizz/statistics/")
        }
        else if(args[1] === `하이머딩거`) {
            message.channel.send("https://www.op.gg/champion/heimerdinger/statistics/")
        }
        else if(args[1] === `헤카림`) {
            message.channel.send("https://www.op.gg/champion/hecarim/statistics/")
        }
        else if(args[1] === `칼바람`) {
            if(args[2] === `가렌`) {
                message.channel.send("https://poro.gg/champions/garen/aram")
            }
        }
        else 
        {
            message.channel.send(args[1] + "님의 전적기록 입니다.");
            message.channel.send("https://www.op.gg/summoner/userName=" + args[1]);
        }
    }
});
client.login(process.env.TOKEN);

// emb_info_MINECRAFT


/*
{
    "id":"jDSJ3fDWPCpJ_FVxqnpanHBGM2IPMGMduXx1zTZlQNcKN2E",
    "accountId":"Lfo7KHulYXCC8HhfzfXvtHNurDjEfGD43P2HSMwcd4mDlHI",
    "puuid":"2-roFTElEWNtmVOEr-CQ4NbONxCX0orBnMS-zh3B3NWHOpApMV9GLuU07wlQx2mBUkZI4WBPPz5mbw",
    "name":"반란두니",
    "profileIconId":3233,
    "revisionDate":1602722665000,
    "summonerLevel":157
}
*/
