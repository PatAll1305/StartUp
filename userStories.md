# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent FauxTweets.
      * So that I can easily log out to keep my information secure.

## Fauxprojects

### Create Fauxprojects

* As a logged in user, I want to be able to post new Fauxprojects.
  * When I'm on the `/new-fauxproject` page:
    * I can write and submit a new Fauxproject.
      * So that I can share my thoughts and memes with my friends.

### Viewing Fauxprojects

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent Fauxprojects.
  * When I'm on the `/fauxprojects` page:
    * I can view the ten most recently posted Fauxprojects.
      * So that I can read and interact with the thoughts and memes of my friends.

* As a logged in _or_ logged out user, I want to be able to view a specific Fauxprojecs
### Updating Fauxprojects

* As a logged in user, I want to be able to edit my Fauxprojects by clicking an Edit button associated with the Fauxproject anywhere that Fauxproject appears.
  * When I'm on the `/fauxprojects`, `/fauxprojects/:id`, or `/users/:id/fauxprojects` pages:
    * I can click "Edit" to make permanent changes to Fauxprojects I have posted.
      * So that I can fix any errors I make in my Fauxprojects.

### Deleting Fauxprojects

* As a logged in user, I want to be able to delete my Fauxprojects by clicking a Delete button associated with the Fauxproject anywhere that Fauxproject appears.
  * When I'm on the `/fauxprojects`, `/fauxprojects/:id`, or `/users/:id/fauxprojects` pages:
    * I can click "Delete" to permanently delete a Fauxproject I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.



## Backing Fauxprojects 

### Backing a project

* As a logged in user I want to be able to back a fauxproject by clicking a "Back Project" button anywhere that fauxproject appears.
    * When I'm on the `/fauxprojects`, `/fauxprojects/:id`, or `/users/:id/fauxprojects` pages:
        * I can click 'Back project' to view the rewards and choose the donation amount.
        * I can click the rewards tab button and see the different rewards offered for backing that fauxproject.


* As a unauthorised or unlogged in user I don't want to be able to back a fauxproject by clicking a "Back Project" button anywhere that fauxproject appears.
    * When I'm on the `/fauxprojects`, `/fauxprojects/:id`, or `/users/:id/fauxprojects` pages:
    * I want to be redirected to the `/fauxprojects/:id/rewards` page when I press the `Back project` button.
        * When I'm on the `/fauxprojects/:id/rewards` page I want to:
        * View the different rewards offered for the fauxproject.
        * The 'Back project' button which redirects to 'Login/Signup' page when clicked.

### Vewing backed project

* As a logged in user:
    * I want to be able to view a history of all projects I have backed.

* As a logged in user _or_ as an unauthorised or unlogged in user:
    * I want to see the deadline and current amount of backers and donations for the fauxproject.

### Updating Backed project

* As a logged in user:
    * I want to be able to change the donation amount or reward.

### Deleting Pledge 

* As a logged in user I can cancel my donation at any time for a 90% refund.



## Categories

### Viewing Categories

* As a logged in _or_ unauthorised or unlogged user I can see the different projects under any filtering category.

### Updating Categories

* As a logged in user I want to see any FauxProjects I create under the category I created it for.
    

## Rewards

### Viewing Rewards

* As a logged in user:
    * I want to see the rewards available for backing a project.
    * I want to see the rewards available change after backing a project.
    * I want to see the current rewards I have recieved.

* As an unauthorised or unlogged in user:
    * I want to see the rewards available for backing a project.
    * I want to see the rewards available change after backing a project.

### Updating Rewards

* As a logged in user I want to:
    * Add new rewards to my projects.
    * Change the current rewards for my projects.
    * Add new rewards for my projects.

### Deleting Rewards

* As a logged in user I want to:
    * Remove rewards from my project.
    

