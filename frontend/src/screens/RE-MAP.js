export  function checkVide(test,nom)
{
  if(test==="")
  return "the field " + nom +" isEmpty  \n"
  return ""
}

export  function checkEmail(email)
{
  if(email.indexOf("@")===-1 || email.lastIndexOf(".") < email.indexOf("@"))
  return "Email is not correct \n"
  return ""

}

export  function checkPassword(password)
{
  if(password.length<6)
  return "password should have at least 6 charcters \n"
  return ""

}

export  function checkConfirmPassword(password,confirmPassword)
{
  if(password!==confirmPassword)
  return "the passwords are not the same \n"
  return ""

}

export  function checkName(name)
{
  if(name.length<3)
  return "name should have at least 3 charcters \n"
  return ""

}

