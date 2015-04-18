var wordCount = 0
var characters = {}
var words = []
var sentences = []
var deletes = 0
var lastWordTime = null
var wordWriteIntervals = [0]
var wordIntervalAverage = 0
var lastChar = null
var totalWords = 0

var lastKeystroke = null
var lastKeystrokeTime = null
var keystrokeIntervals = [0]

var clean = true

$(document).ready(function() {
	$('#typing').keyup(function(e) {
		if (clean) {
			lastKeystroke = e.timeStamp
			lastWordTime = e.timeStamp
		}

		getWordCount(this)
		getAverageWordInterval()

		if (e.which===32 && lastChar!=32) logWord(e.timeStamp)

		logKeystroke(e.which, e.timeStamp)
		updateStats()
		lastChar = e.which
		clean = false
	})
})

function getWordCount(text) {
	wordCount = $(text).val().split(' ').length
}

function getAverageWordInterval() {
	var total = 0
	for (var i = 0; i < wordWriteIntervals.length; i++) {
		total += wordWriteIntervals[i]
	}
	wordIntervalAverage = total / wordWriteIntervals.length
}

function logWord(timestamp) {
	totalWords++
	if (!lastWordTime) {
		lastWordTime = timestamp
		return		
	}
	var wordWriteTime = timestamp - lastWordTime
	wordWriteIntervals.push(wordWriteTime)
	lastWordTime = timestamp
}

function logKeystroke(key, timestamp) {
	if (key===8) deletes++ 
	incrCharCount(key)
	
	if (!lastKeystrokeTime) {
		lastKeystrokeTime = timestamp
		return
	}
	var keystrokeTime = timestamp - lastKeystrokeTime
	keystrokeIntervals.push(keystrokeTime)

	lastKeystrokeTime = timestamp
}

function incrCharCount(key) {
	if (characters[key]) return characters[key]++
	characters[key] = 1
}

function updateStats() {
	$('.stats').html('<p>Keystroke intervals: '+keystrokeIntervals+'</p><p>Word intervals: '+wordWriteIntervals+'</p><p>Average word interval: '+wordIntervalAverage+'</p><p>Deletes: '+deletes+'</p><p>Word count: '+wordCount+'</p><p>Characters: '+JSON.stringify(characters)+'</p>')
}

//time between key strokes
//time between words
//time between sentences
//wpm