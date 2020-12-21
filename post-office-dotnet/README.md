# Test assessment backend

## Database
~~~
"MsSqlConnection": "Server=localhost\\SQLEXPRESS;Database=postoffice;Trusted_Connection=True;" 
~~~

## Install or update tooling
~~~
dotnet tool install --global dotnet-ef 
dotnet tool update --global dotnet-ef 
 
dotnet tool install -g dotnet-aspnet-codegenerator 
dotnet tool update -g dotnet-aspnet-codegenerator 
~~~

## Generate database migration
Run from solution folder.  
~~~
dotnet ef migrations --project DAL.App.EF --startup-project WebApp add InitialDbCreation 
dotnet ef database update --project DAL.App.EF --startup-project WebApp 
~~~
