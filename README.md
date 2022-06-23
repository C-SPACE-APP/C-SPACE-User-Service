# C-SPACE-User-Service  
The User Services will handle all requests with relation to the data of C-\<SPACE> users. Two APIs are made available to access the service, one for **client** use and the other is for the other **services**. All of the endpoints from the APIs will return a JSON object containing the properties:  
+ `message`: a description of the response; and
+ `payload`: another JSON object containing the requested data  

An example response would look something like this:
```
{
  message: `Succesful`,
  payload: {
    User: { ... }
  }
}
```
Requirements and options for each endpoint are as follows:

 
 <br/>
 
 ## for Client  
 There are **four** services open for client use. 

#### GET /  
Used to fetch data of multiple users.

 + **Requirement/s**  
   - User is logged in
   
 + **Optiona/s** (Query parameter/s)  
   - `search`: **String** that will be used to match the **givenName**, **lastName**, or **username** of users. If none is provided, user documents will be fetched in descending order of creation date.

#### GET /:id  
Used to fetch data of a specific user with ObjectId equal to given "id"

 + **Requirement/s**  
   - User is logged in

#### PATCH /:id  
Used to edit data of a specific user with ObjectId equal to given "id"

 + **Requirement/s**  
   - User is logged in
   - User owns the `id` to be edited
   - Request body containing the user properties to be edited

#### DELETE /:id  
Used to edit data of a specific user with ObjectId equal to given "id"

 + **Requirement/s**  
   - User is logged in
   - User owns the `id` to be deleted

 <br/>
 
 ## for other Service  
 There is only one endpoint available for other services but it can function in multiple ways depending on a single property in the request body.
 
 #### POST /app-events  
  + **Requirement/s**  
  Request body must contain these two properties:  
    - `event`: **String** that will specify which user service to access. Possible values are:
      - FIND_BY_GOOGLE_ID
      - ADD_USER
      - GET_USER
    - `data`: **JSON object** containing required properties.
