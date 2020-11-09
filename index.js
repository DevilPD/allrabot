const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const client = new Discord.Client();



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
        { name: '!!서버주소', value: '서버주소를 불러옵니다.'},
        { name: '!!모드사이트', value: '마크 모드사이트를 알려드립니다.'},
        { name: '!!플긴사이트', value: '마크 플러그인사이트를 알려드립니다.'},
        { name: '!!모드버킷', value: '모드버킷(CatServer) 다운로드 사이트를 알려드립니다.'},
    );
    const emb_ft = new Discord.MessageEmbed() // 도움말
    .setColor('#0099ff')
    .setTitle('기능')
    .setDescription('올라봇의 기능 명령어!')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: '!!팀뷰어', value: '팀뷰어 다운로드 사이트를 알려드립니다.'},
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

});
client.login(process.env.TOKEN);




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
