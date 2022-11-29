# WisdomCircle

# Application
Live at: https://wisgen.vercel.app/

Sample Credentials to try sign-in flow,

| email | user123@gmail.com |
-- | --
| password | user123 |



# API
API is listening at: https://wisgen-api.onrender.com

| Endpoint | METHOD | Request Data | Response |
| -- | :--: | -- | -- |
| https://wisgen-api.onrender.com/ | GET | {} |{ message: "Calling API..." }
| https://wisgen-api.onrender.com/login | POST | { "email": "\<valid email>\", "password": "\<password>\"} | { isLoggedIn: \<boolean>\, message: "\<Authentication result message>\", "AccessToken": "\<JsonWebToken>\" (if isLoggedIn  == TRUE) }
