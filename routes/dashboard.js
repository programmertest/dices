
/*
 * GET home page.
 */

exports.dashboard = function(req, res){
  var email=req.body.email;
  var pass=req.body.pass;
  var user=req.body.user;
  var invite=req.body.invite;
  var user_id=req.body.user_id;
  var versus_id=req.body.versus_id;
  res.render('dashboard', { title: '3Azar', user: user, email:email, pass: pass, invite:invite, user_id:user_id, versus_id:versus_id });
};