## LINKS

static
<https://kornavol.github.io/Task-Manager/>

dev.
<https://my-dev-task-manager.herokuapp.com/>

## DESCRIPTION

## Task

<https://www.figma.com/file/7HV64al5VorySNvRKlw2n4/404s-Art-Board?node-id=1021%3A16>

## Mini plan

- connect Bootstrap to setup
<https://react-bootstrap.github.io/components/buttons/>

## for inspiration

<https://pomofocus.io/>

## To-do

- create a "accordion" for task which will be contain:
  - status (active, inactive)
  - data creation
- implement authorization
- align all content to center (horizontally)

## Questions

- Why bubbling not working (click on a task)
    the problem was solved by itself
- alternative find method but without return
    forEach and return null as break

- Why "start" log always  = 0;
- Why my UseState is executing in the end even if "gate is closet".
- If I re-render DOM with active UseEff (in process). This action will clone the useEffect

- Why return from useEffect fires (willUnmount)?

## Bug

- After compute time period for first task, I create a new one  (which as default has status - active) and start time. The result will be wrong;
- I have an opportunity to create or move to task during time computing (time counting). Need to fix.
- When I click to SignIn-SignUp toggle. It doesn't occur first time .
