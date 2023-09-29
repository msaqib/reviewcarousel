const length = 20
const imageurl = 'https://randomuser.me/api/?gender=female?results=' + length 
/*const texturl = "https://api.deepai.org/api/text-generator"
const textQuery = "Generate a random customer review for a fast food joint"
const formData = new FormData()
formData.append('text', textQuery)*/

const image = document.getElementById('image')
const name = document.getElementById('name')
const profession = document.getElementById('profession')
const message = document.getElementById('review')
const forward = document.getElementById('forward')
const backward = document.getElementById('backward')
const loader = document.getElementById('loader')
const reviewSection = document.querySelector('.review')

const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua'];
let reviews = []

const minWordsPerSentence = 5
const maxWordsPerSentence = 15

const minSentences = 1
const maxSentences = 5

function generateRandomSentence(numWords) {
    let sentence = ''
    for (let i = 0 ; i < numWords ; i++) {
        const randIndex = Math.floor(Math.random()*words.length)
        sentence += words[randIndex]
        if(i < numWords - 1) {
            sentence += ' '
        }
    }
    sentence += '.'
    return sentence
}

function generateRandomReview() {
    let review = ''
    const numSentences = Math.floor(Math.random()*(maxSentences - minSentences) + minSentences)
    for (let i = 0 ; i < numSentences ; i++) {
        const numWords = Math.floor(Math.random()*(maxWordsPerSentence - minWordsPerSentence) + minWordsPerSentence)
        review += generateRandomSentence(numWords)
        if (i < numSentences - 1) {
            review += ' '
        }
    }
    return review
}

for (let i = 0 ; i < length ; i++) {
    reviews.push(generateRandomReview())
}

const imageRequest = fetch(imageurl).then(response => {
    if (response.ok) {
        return response.json()
    }
    else {
        throw new Error('API request failed')
    }
}).then(data => {
    image.src = data.results[0].picture['large']
    name.textContent = data.results[0].name.last + ', ' + data.results[0].name.first
    profession.textContent = 'Jahil'
    loader.style.visibility = 'hidden';
    loader.style.height = '0'
        message.textContent = reviews[0]
    reviewSection.style.visibility = 'visible'
}).catch(error => console.log(error))

/*const textRequest = fetch(texturl, {
    method: 'POST',
    headers: {
        'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K',
    },
    body: formData,
})
.then(response => {
    if(response.ok) {
        return response.json()
    }
    else {
        throw new Error("Couldn't fetch text")
    }
}).then(data => {
    console.log(data.output)
}).catch(error => console.log(error))*/

/*Promise.all([imageRequest, textRequest]).then(responses => {
    if (responses.every(response => response.status === 200)) {
        return Promise.all(responses.map(response => response.json()))
    }
    else {
        throw new Error('One or more requests failed')
    }
}).then(dataArray => {
    const [imageResponse, textResponse] = dataArray

    image.src = imageResponse.results[0].picture['large']
    name.textContent = imageResponse.results[0].name.last + ', ' + imageResponse.results[0].name.first
    profession.textContent = 'Jahil'
    loader.style.visibility = 'hidden';
    loader.style.height = '0'
    reviewSection.style.visibility = 'visible'

    message.textContent = textResponse.output
}).catch(error => console.log(error))*/


