
const Main = {


    init: function() {
        this.chacheSelectors()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    chacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click.bind(self)
        })
    },

    getStoraged: function() {
        const tasks = localStorage.getItem('tasks')
        if (tasks) {
            this.tasks = JSON.parse(tasks)
        } else {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    },

    getTaskHTML: function(task) {
        return `
            <li>
                <div class="check"></div>
                <label class="task">
                    ${task}
                </label>
                <button class="remove" data-task="${task}"></button>
            </li>
        `
    },

    buildTasks: function() {

        let html = ''
        this.tasks.forEach(item => {
            html += this.getTaskHTML(item.task)
        })

        this.$list.innerHTML = html

        this.chacheSelectors()
        this.bindEvents()
    },

    Events: {
        checkButton_click: function(e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')
            
            if(!isDone){
                li.classList.add('done')
                return
            }
            li.classList.remove('done')       
        },

        inputTask_keypress: function(event) {
            const key = event.key
            const value = event.target.value

            if (key === 'Enter') {
                this.$list.innerHTML += this.getTaskHTML(value)

                event.target.value = ''

                this.chacheSelectors()
                this.bindEvents()

                const savedTasks = localStorage.getItem('tasks')
                const savedTasksObj = JSON.parse(savedTasks)

                const obj = [
                    {task: value},
                    ...savedTasksObj,
                ]

                localStorage.setItem('tasks', JSON.stringify(obj))
            }
        },

        removeButton_click: function(event){
            const li = event.target.parentElement
            const value = event.target.dataset['task']

            const newTasksState = this.tasks.filter(item => item.task !== value)

            localStorage.setItem('tasks', JSON.stringify(newTasksState))


            li.classList.add('removed')
            setTimeout(function(){
                li.classList.add('hidden')
            },300)
        }

    },


}

/* não esquecer de chamar a função */
Main.init()