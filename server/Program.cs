using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<MongoClient>(provider => {
    return new MongoClient(builder.Configuration.GetConnectionString("mongodb"));
});

// cors
builder.Services.AddCors(options => options.AddPolicy("MyPolicy", policy => {
        policy.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
}));

builder.Services.AddTransient<FeedbackManager>();

var app = builder.Build();

app.UseCors("MyPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
