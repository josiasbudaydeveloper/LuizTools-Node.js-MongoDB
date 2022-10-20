const ADMIN_PROFILE = 1;

function isAdmin(profile) {
  return profile === ADMIN_PROFILE;
}

module.exports = (req) => {
  const user = req.user;
  if (!user) return false;

  const profile = user.profile;
  const originalUrl = req.originalUrl;
  
  switch(originalUrl) {
    case '/reports': return isAdmin(profile);
    case '/users/delete': return isAdmin(profile);
    default: return true;
  }
}