export default (sequilize, DataTypes) => {
  //database table name 
  const githubAuth = sequilize.define('users', {
    username: DataTypes.STRING,
    display_name: DataTypes.STRING,
    github_ID: DataTypes.STRING,
    avatar_url: DataTypes.STRING,
  })
}