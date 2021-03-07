
    /* Previous version  of click function. Keep because of pass to dom element  */
    let click = (e) => {

        let target = e.target.parentElement.children[0].textContent;

        tasks.find((item) => {
            if (item.title === target) {
                item.title = "another name";
                
            }
            

        })
    }