using System.Linq;
using System.Text.Json;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

public class FeedbackManager {
    private MongoClient mongoClient;
    private IMongoDatabase database;
    private IMongoCollection<BsonDocument> FeedbackCollection;

    public FeedbackManager(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
        this.database = mongoClient.GetDatabase("FeedbackSystem");
        this.FeedbackCollection = this.database.GetCollection<BsonDocument>("Feedback");
    }

    public List<Feedback> GetAllFeedbacks() {
        List<Feedback> feedbacks = new List<Feedback>();
        foreach(var feedback in FeedbackCollection.AsQueryable()) {
            feedbacks.Add(ConvertBsonToFeedback(feedback));
        }
        return feedbacks;
    }

    public async Task<FeedbackOperationDone> CreateFeedback(FeedbackCreate feedbackCreate) {
        var bsonFeedbackCreate = feedbackCreate.ToBsonDocument();

        await FeedbackCollection.InsertOneAsync(bsonFeedbackCreate);
        var Id = bsonFeedbackCreate["_id"].ToString();

        return new FeedbackOperationDone {
            Id = Id
        };
    }

    public async Task UpdateFeedback(Feedback feedback) {
        var filter = Builders<BsonDocument>.Filter.Eq(doc => doc["_id"], feedback.Id);
        var update = Builders<BsonDocument>.Update
            .Set(doc => doc["Title"], feedback.Title)
            .Set(doc => doc["Description"], feedback.Title);

        await FeedbackCollection.UpdateOneAsync(filter, update);
    }

    public async Task DeleteFeedback(string id) {
        var filter = Builders<BsonDocument>.Filter.Eq(doc => doc["_id"], new ObjectId(id));
        await FeedbackCollection.DeleteOneAsync(filter);
    }

    // Private Functionality
    private Feedback ConvertBsonToFeedback(BsonDocument bson) {
        return new Feedback {
                Id = bson["_id"].ToString(),
                Title = bson["Title"].ToString(),
                Description = bson["Description"].ToString(),
                Submitter = bson["Submitter"].ToString(),
                SubmitterMail = bson["SubmitterMail"].ToString()
        };
    }
}