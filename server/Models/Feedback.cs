using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Feedback {
    public string Id {get; set;}
    public string Title {get; set;}
    public string Description {get; set;}
    // Todo: Images
    public string Submitter {get; set;}
    public string SubmitterMail {get; set;}

    public static explicit operator Feedback(BsonDocument v)
    {
        throw new NotImplementedException();
    }
}