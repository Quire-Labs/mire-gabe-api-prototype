### Mire API Prototype
A prototype for the API of the Mire web app.

### Get Calls

| URL | Description | Data Type |
| - | - | - |
| /buddy/list | List your buddies | N/A |
| /buddy/:id | View a specific buddy given their id | `id` |
| /messages/:buddyId | Get a list of messages between you and the given buddy | `id` |
| /post/:id | View a specific post | `id` |
| /post/list | List posts in your feed | N/A |
| /post/topic/:topic | List posts tagged with the given topic | `string` |
| /comments/:postId | View comments on a specific post | `id` |
| /news/latest | List the latest news for topics you've subscribed to | N/A |
| /news/:topic | List the latest news for the given topic | `string` |

### Post Calls

| URL | Description | Data Type | Expected Keys |
| - | - | - | - |
| /messages/:buddyId | Send a message to the specified buddy | `id` | message (`string`) |
| /user | Create a new user | N/A | name (`string`) |
| /comments/:postId | Add a comment to a post | `id` | text (`string`) |
| /buddy/request/:id | Send a buddy request to the given user | `id` | N/A |
| /post | Create a new post | N/A | tags (`string array`), message (`string`), link (`null` or `string`), parentPost (`null` or `id`) |


### Example Post Call
`/post`
```json
{
  "tags": ["sports", "baseball"],
  "message": "Here's some baseball statistics.",
  "link": "http://www.espn.com/mlb/statistics"
}
```
