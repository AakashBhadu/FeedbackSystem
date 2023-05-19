using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class FeedbackController : ControllerBase
{

    private readonly ILogger<FeedbackController> logger;
    private FeedbackManager feedbackManager;

    public FeedbackController(ILogger<FeedbackController> logger, FeedbackManager feedbackManager)
    {
        this.logger = logger;
        this.feedbackManager = feedbackManager;
    }

    // get all feedbacks
    [HttpGet]
    public List<Feedback> GetAllFeedbacks() {
        var feedbacks = feedbackManager.GetAllFeedbacks();
        return feedbacks;
    }

    // get feedbacks by Date Range

    // get feedbacks by Location

    // get feedbacks by word

    // create feedback
    [HttpPost]
    public async Task<ActionResult<FeedbackOperationDone>> CreateFeedback(FeedbackCreate feedbackCreate) {
        var feedbackCreated = await feedbackManager.CreateFeedback(feedbackCreate);
        return feedbackCreated;
    }

    // update feedback by id
    [HttpPatch]
    public async Task UpdateFeedback([FromBody] Feedback feedback) {
        await feedbackManager.UpdateFeedback(feedback);
    }

    // delete feedback by id
    [HttpDelete]
    public async Task DeleteFeedback(string id) {
        await feedbackManager.DeleteFeedback(id);
    }

}
