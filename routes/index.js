
/**
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 **/
function SHA1(msg) {
  function rotate_left(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  function lsb_hex(val) {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 ) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  function cvt_hex(val) {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- ) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
        msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  switch( msg_len % 4 ) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
      break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
      break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
      break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ ) {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ ) {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}


function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '3Azar' });
};


exports.access = function(req, res){
  var record = [];


  req.getConnection(function(err,connection){

    var query = connection.query("SELECT user_id AS ID FROM user", [], function(err,rows)
    {
      console.log(query.sql);
      if(err) {
        console.log("Error Selecting : %s ", err);
      }

      if(rows.length > 0) {
        for (var id in rows) {

        var play = connection.query("SELECT DISTINCT(play_number) AS PLAY, user_id AS ID FROM play WHERE user_id='" + rows[id].ID + "'", [], function (play_err, play_rows) {
          console.log(play.sql);

          if (play_rows.length > 0) {
            for (var iplayr in play_rows) {

              var points = connection.query("SELECT u.user_id AS ID, user_name AS USER, SUM(play_points) AS POINTS FROM play p " +
                  "INNER JOIN user u ON p.user_id=u.user_id " +
                  "WHERE u.user_id='" + play_rows[iplayr].ID + "' AND play_number='" + play_rows[iplayr].PLAY + "'", [], function (points_err, points_rows) {

                if (points_rows.length > 0) {
                  for (var ipointsw in points_rows) {
                    record.push(points_rows[ipointsw]);
                  }
                }

              });

            }
          }


        });

      }
      }else{
        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
      }

    });

  });



  var email=req.body.email;
  var pass=req.body.pass;
  var user = "";
  var user_id=0;

  req.getConnection(function(err,connection){

    var query = connection.query("SELECT user_id AS ID, user_name AS USER FROM user WHERE user_email='"+email+"' AND user_password='"+SHA1(pass)+"'", [], function(err,rows)
    {
      console.log(query.sql);
      if(err) {
        console.log("Error Selecting : %s ", err);
      }

      if(rows.length > 0) {
        user= rows[0].USER;
        user_id=rows[0].ID;
        var play = connection.query("SELECT DISTINCT(play_number) AS PLAY FROM play WHERE user_id='" + rows[0].ID + "'", [], function(play_err,play_rows) {
          console.log(play.sql);

          var arr =  []; var rival = []; var rival_points = [];
          if (play_rows.length > 0) {
            for (var iplayr in play_rows) {

              var points = connection.query("SELECT SUM(play_points) AS POINTS, (SELECT user_name FROM USER WHERE user_id=user_versus) AS RIVAL, (SELECT SUM(play_points) AS POINTS FROM play p2 INNER JOIN user u2 ON p2.user_id=u2.user_id WHERE u2.user_id=p.user_versus AND p2.play_number='" + play_rows[iplayr].PLAY + "') AS RIVAL_POINTS FROM play p " +
                  "INNER JOIN user u ON p.user_id=u.user_id " +
                  "WHERE u.user_id='" + rows[0].ID + "' AND play_number='" + play_rows[iplayr].PLAY + "'", [], function (points_err, points_rows) {

                if (points_rows.length > 0) {
                  for (var ipointsw in points_rows) {
                      arr.push(points_rows[ipointsw].POINTS);
                      rival.push(points_rows[ipointsw].RIVAL);
                      rival_points.push(points_rows[ipointsw].RIVAL_POINTS);
                  }
                  }

              });

            }
          }

          setTimeout(function(){

            var matriz = {}; var winner = {}; var loser = {}; var heat = {}; var versus = {};
            record.forEach(function(register) {
              var _user_ = register["USER"];
              matriz[_user_] = matriz[_user_] ? (matriz[_user_] + register["POINTS"] ) : register["POINTS"];
              versus[_user_] = register["ID"];

              for(var i in arr){

                if(arr[i]==matriz[_user_]) {
                    if(isNaN(winner[_user_]))
                      winner[_user_]=1;
                       else winner[_user_]+=1;
                  }
                    else {
                      if(isNaN(winner[_user_]))
                        winner[_user_]=0;
                         else winner[_user_]+=0;
                  }

                if(rival_points[i]==matriz[_user_]) {
                  if(isNaN(loser[_user_]))
                    loser[_user_]=1;
                  else loser[_user_]+=1;
                }
                else {
                  if(isNaN(loser[_user_]))
                    loser[_user_]=0;
                  else loser[_user_]+=0;
                }

                if(arr[i]!=matriz[_user_]&&rival_points[i]==matriz[_user_]) {
                  if(isNaN(heat[_user_]))
                    heat[_user_]=1;
                  else heat[_user_]+=1;
                }
                else {
                  if(isNaN(heat[_user_]))
                    heat[_user_]=0;
                  else heat[_user_]+=0;
                }

              }
            });

            var RowDataPacket = [];
            for(var i in matriz) {
                RowDataPacket.push({
                "ID" : versus[i],
                "USER" : i,
                "POINTS" : matriz[i],
                "WINNER" : winner[i],
                "LOSER" : loser[i],
                "HEAT" : heat[i]
              });
            }
console.log(versus);
            res.render('record', {page_title:"3 Azar",
              data: arr, rival: rival, rival_points: rival_points, record: sortByKey(RowDataPacket, "POINTS"), user: user, pass:pass, email:email, user_id:user_id
              });
          }, 3000);

        });

      }else{
        res.writeHead(302, {
          'Location': '/'
        });
        res.end();
      }

    });

  });
};


exports.dashboard = function(req, res){
  var email=req.body.email;
  var pass=req.body.pass;
  var user=req.body.user;
  var invite=req.body.invite;
  var user_id=req.body.user_id;
  var versus_id=req.body.versus_id;
  res.render('dashboard', { title: '3Azar', user: user, email:email, pass: pass, invite:invite, user_id:user_id, versus_id:versus_id });
};