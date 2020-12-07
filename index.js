const Discord = require('discord.js');
const { fsync } = require('fs');
const https = require('https');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs').promises;
const fst = require('fs');
const jsonfile = require('jsonfile');
const champ = require('./champ.json');
const client = new Discord.Client();

const shuffleArray = array => { // 배열 랜덤 섞기
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * (i + 1));
      const x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
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
    
    setInterval(function() {
        var url = "https://na.leagueoflegends.com/ko-kr/news/tags/patch-notes"
        request(url, function(error, response, html){
            if (error) {throw error};
            var rp_html_1 = html.replace(/\=/g, "");
            var index_html = rp_html_1.indexOf("style__Item-sc-3mnuh-3 ekxbJn")
            var href_html_1 = rp_html_1.substr(index_html, 200);
            var index_html_2 = href_html_1.indexOf("href");
            var href_html_2 = href_html_1.substr(index_html_2 + 5, 200)
            var sp_href_html_2 = href_html_2.split('"');
            var patch_note = "https://na.leagueoflegends.com/" + sp_href_html_2[0]            
            var newon = sp_href_html_2[0];
            

            async function updatePatch(old) {
                try {
                    let data = await fs.readFile('patch.json');
                    let obj = JSON.parse(data);
            
                    obj.old = old;
            
                    await fs.writeFile('patch.json', JSON.stringify(obj));
                } catch(e) {
                    console.log(e);
                    throw e;
                }
            }
            var text = fst.readFileSync('patch.json', 'utf8');
            var rp_text = text.replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");
            var sp_text = rp_text.split(':');
            var old = sp_text[1];

            if (newon == old) {
                console.log("업데이트가 아직 존재하지 않습니다.");
            }
            else {
                console.log(old);
                client.guilds.cache.get("432327121000595466").channels.cache.get("669513085777739777").send("새로운 업데이트!");
                client.guilds.cache.get("432327121000595466").channels.cache.get("669513085777739777").send(patch_note);
                updatePatch(newon);
            }
            // console.log(sp_html_2);
        });
    }, 10000);
    
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
        { name: '!!마크', value: '마크 관련 정보'},
        { name: '!!롤', value: '롤 검색기능'},
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
    const lol_emb = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('롤 명령어')
    .setDescription('올라봇의 롤 명령어!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!롤 <챔피언>', value: '롤 챔피언 정보 링크를 알려드립니다.'},
        { name: '!!롤 <플레이어이름>', value: '롤 플레이어 정보 링크를 알려드립니다'},
        { name: '!!롤 칼바람 <챔피언>', value: '칼바람에서의 롤 챔피언 정보 링크를 알려드립니다.'},
    );
    const emb_team = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('팀 가르기')
    .setDescription('올라봇의 팀 가르기!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!팀가르기 <사람들>', value: `ex) !!팀가르기 호영,진환,성묵,...\n\n※최대 10명까지!※`},
    );

    // lol_emb 
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
        var text = fs.readFileSync('patch.json', 'utf8');
        var rp_text = text.replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");
        var sp_text = rp_text.split(':');
        var old = sp_text[1];
        message.channel.send(old)
    }
    else if(args[0] ===`!!https`) { 
        var url = "https://na.leagueoflegends.com/ko-kr/news/tags/patch-notes"
        request(url, function(error, response, html){
            if (error) {throw error};
            var rp_html_1 = html.replace(/\=/g, "");
            var index_html = rp_html_1.indexOf("style__Item-sc-3mnuh-3 ekxbJn")
            var href_html_1 = rp_html_1.substr(index_html, 200);
            var index_html_2 = href_html_1.indexOf("href");
            var href_html_2 = href_html_1.substr(index_html_2 + 5, 200)
            var sp_href_html_2 = href_html_2.split('"');
            var patch_note = "https://na.leagueoflegends.com/" + sp_href_html_2[0]            
            var newon = sp_href_html_2[0];
            

            async function updatePatch(old) {
                try {
                    let data = await fs.readFile('patch.json');
                    let obj = JSON.parse(data);
            
                    obj.old = old;
            
                    await fs.writeFile('patch.json', JSON.stringify(obj));
                } catch(e) {
                    console.log(e);
                    throw e;
                }
            }
            var text = fst.readFileSync('patch.json', 'utf8');
            var rp_text = text.replace(/\{/g, "").replace(/\}/g, "").replace(/\"/g, "");
            var sp_text = rp_text.split(':');
            var old = sp_text[1];

            if (newon == old) {
                client.guilds.cache.get("432327121000595466").channels.cache.get("669513085777739777").send("channel check.");
            }
            else {
                console.log(old);
                console.log(patch_note);
                updatePatch(newon);
            }
            // console.log(sp_html_2);
        });
    }
    else if(args[0] === `!!팀가르기`) {             //function test
        if (args[1] == null) {
            message.channel.send(emb_team);
        }
        else {
        var res = args[1].split(',')
        if (res[0] != null) {
            if (res[1] != null) {
                if (res[2] != null) {
                    if (res[3] != null) {
                        if (res[4] != null) {
                            if (res[5] != null) {
                                if (res[6] != null) {
                                    if (res[7] != null) {
                                        if (res[8] != null) {
                                            if (res[9] != null) {
                                                if (res[10] != null) {
                                                    var bug = "엥"
                                                }
                                                else {
                                                    var nm = 10;
                                                }
                                            }
                                            else {
                                                var nm = 9;
                                            }
                                        }
                                        else {
                                            var nm = 8;
                                        }
                                    }
                                    else {
                                        var nm = 7;
                                    }
                                }
                                else {
                                    var nm = 6;
                                }
                            }
                            else {
                                var nm = 5;
                            }
                        }
                        else {
                            var nm = 4;
                        }
                    }
                    else {
                        var nm = 3;
                    }
                }
                else {
                    var nm = 2;
                }
            }
            else {
                var nm = 1;
            }
        }
        else {
            var nm = 0;
        }
        if(bug != "엥") {
            shuffleArray(res);
            message.channel.send("-------1팀--------");
            for (i = 0; i < parseInt(nm/2); i++) {
                message.channel.send(res[i]);
            }
            message.channel.send("-------2팀--------");
            for (i = parseInt(nm/2); i < nm; i++) {
                message.channel.send(res[i]);
            }
        }
    else {
        message.channel.send("최대 10명 까지만 가능합니다.");
    }
    }
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
    else if(args[0] == `!!롤`) {
        if(champ[args[1]] != null) {
            message.channel.send("https://www.op.gg/champion/" + champ[args[1]] );
        }
        else if(args[1] == `칼바람`) {
            if(champ[args[2]] != null) {
            message.channel.send("https://poro.gg/champions/" + champ[args[2]] + "/aram");
            }
            else {
                message.channel.send("플레이어 정보는 !!롤 <플레이어>를 사용해야합니다.")
            }
        }
        else if(args[1] != null) {
            message.channel.send("https://www.op.gg/summoner/userName=" + args[1]);
        }
        else {
            message.channel.send(lol_emb)
        }
    }
});
client.login(process.env.TOKEN);

// emb_info_MINECRAFT

/*
https://www.op.gg/champion/nunu/
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

/*
message.channel.send("------------------------------------------------")
message.channel.send("1 --> " + a1 + "," + b1 + "," + c1 + "," + d1 + "," + e1)
message.channel.send("2 --> " + a2 + "," + b2 + "," + c2 + "," + d2 + "," + e2)
message.channel.send("------------------------------------------------")



*/ 

/*


args[1] 만큼 난수생성 (      sadaliNum(args[1])      )



*/