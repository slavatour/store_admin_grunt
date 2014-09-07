exports.admin = function(req, res){
  res.render('../views/admin', { title: 'store admin' });
};

exports.login = function(req, res){
  res.render('../views/login', { title: 'login' });
};
