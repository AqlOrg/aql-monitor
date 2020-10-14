export default (sequilize, DataTypes) => {
  //database table name 
  const githubAuth = sequilize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    
  })
}