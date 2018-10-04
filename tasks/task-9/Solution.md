# Task 9 Tutorial
*For this task just follow the instructions for **task 5** with only one minor change. All of this inside of your frontend folder.*

* Add the following code to `scr/test/stories/index.stories.js`.
    ```javacript
    // Other code
    
    storiesOf('Signup and Login', module)
      .addDecorator(story => <Provider store={store}>
                    {/* This will prevent errors because of your Link component*/}
                    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
                   </Provider>)
        // Other code
      .add('WebsiteForm', () => (
        <WebsiteForm onSubmit={action('submitted')}/>
        ))
      .add('Website', () => (
        <Website name="Website Name" url="www.example.com" status="online"/>
        ))
    ```

*Remember to follow the instructions in **task 5** first, see you in the next task!*