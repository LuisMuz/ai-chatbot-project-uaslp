import json
import sys
import pickle
import numpy as np
import nltk

from keras.models import load_model
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

#def get_folder_value():
#  with open('chat_model/folder_value.txt', 'r') as file:
#    return file.read().strip()

folder = "Habitat"

print(f"El valor para la carpeta del modelo es: {folder}")
# loading the files we made previously
intents = json.loads(open(f"chat_model/{folder}/Reglamento.json", 'r', encoding='utf-8').read())
words = pickle.load(open(f'chat_model/{folder}/words.pkl', 'rb'))
classes = pickle.load(open(f'chat_model/{folder}/classes.pkl', 'rb'))
model = load_model(f'chat_model/{folder}/chatbotmodel.h5')

def clean_up_sentences(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word)
                      for word in sentence_words]
    return sentence_words

def bagw(sentence):

	# separate out words from the input sentence
	sentence_words = clean_up_sentences(sentence)
	bag = [0]*len(words)
	for w in sentence_words:
		for i, word in enumerate(words):

			# check whether the word
			# is present in the input as well
			if word == w:

				# as the list of words
				# created earlier.
				bag[i] = 1

	# return a numpy array
	return np.array(bag)

def predict_class(sentence):
	bow = bagw(sentence)
	res = model.predict(np.array([bow]))[0]
	ERROR_THRESHOLD = 0.3
	results = [[i, r] for i, r in enumerate(res)
			if r > ERROR_THRESHOLD]
	results.sort(key=lambda x: x[1], reverse=True)
	return_list = []
	for r in results:
		return_list.append({'intent': classes[r[0]],
							'probability': str(r[1])})
		return return_list

def get_response(intents_list, intents_json):
	tag = intents_list[0]['intent']
	list_of_intents = intents_json['intents']
	result = ""
	for i in list_of_intents:
		if i['tag'] == tag:
			result = i['response']
			break
	return result

def get_message(user_message):
	message = user_message
	ints = predict_class(message)
	if not ints:
		return "Lo siento, no entiendo tu pregunta. Por favor, reformula tu pregunta."
	else:
	    return get_response(ints, intents)
	