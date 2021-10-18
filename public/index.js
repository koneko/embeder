let fClasses = []
let fIndex = 0;

function addField() {
    let fields = document.querySelector('.fields')
    let input = document.createElement('div')
    fIndex = fIndex + 1
    input.innerHTML = `<input
    type="text"
    placeholder="Field ${fIndex}..."
    id="field"
    class="field${fIndex}" />`
    fields.appendChild(input)
    fClasses.push(`field${fIndex}`)
}

function send() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let colour = document.getElementById('color').value
    let color = colour.replace('#', '!!')
    let webhookid = document.getElementById('webhookid').value
    let webhooktoken = document.getElementById('webhooktoken').value
    fetch(`/api/send?title=${title}&description=${description}&color=${color}&webhookid=${webhookid}&webhooktoken=${webhooktoken}`)
    console.log(title, description, color)
}