from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.util import ngrams
import pandas as pd
from sklearn.svm import SVC
from sklearn.metrics import classification_report, accuracy_score
from flask_cors import CORS
import nltk
nltk.download('stopwords')
nltk.download('punkt')

# Defina a função de preprocessamento e previsão


def preprocess_text(text):
    # Normalização: converter para minúsculas
    text = text.lower()

    # Remover pontuações e caracteres especiais
    text = re.sub(r'\W', ' ', text)

    # Tokenização
    tokens = word_tokenize(text, language='portuguese')

    # Remover palavras vazias
    tokens = [
        word for word in tokens if word not in stopwords.words('portuguese')]

    # Gerar trigramas
    trigrams = list(ngrams(tokens, 3))

    # Concatenar trigramas em uma única string
    trigram_str = [' '.join(trigram) for trigram in trigrams]

    return ' '.join(trigram_str)


def predict_text(text, model_filename='./svm_model.joblib', vectorizer_filename='./tfidf_vectorizer.joblib', df_true_links=None, similarity_file_path='./similarities.npy', similarity_threshold=0.1):
    # Carregar o modelo salvo
    model = joblib.load(model_filename)

    # Carregar o vetorizador salvo
    vectorizer = joblib.load(vectorizer_filename)

    # Pré-processar o texto
    processed_text = preprocess_text(text)

    # Vetorizar o texto fornecido
    text_tfidf = vectorizer.transform([processed_text])

    # Fazer a previsão
    prediction = model.predict(text_tfidf)

    # Se a previsão for 'falsa', encontrar o texto mais semelhante
    if prediction[0] == 'falsa':
        if df_true_links is not None and not df_true_links.empty:
            # Vetorizar os textos verdadeiros
            true_texts_tfidf = vectorizer.transform(
                df_true_links['texto'].apply(preprocess_text))

            # Calcular a similaridade do cosseno
            similarities = cosine_similarity(text_tfidf, true_texts_tfidf)

            # Encontrar o índice do texto mais semelhante
            most_similar_index = np.argmax(similarities)
            # Obter a similaridade do texto mais semelhante
            most_similar_score = similarities[0, most_similar_index]

            # Verificar se a similaridade excede o limiar
            if most_similar_score >= similarity_threshold:
                # Retornar o link correspondente
                return 'falso', df_true_links['link'].iloc[most_similar_index]
            else:
                # Similaridade não é alta o suficiente
                return 'não é possível verificar se o texto é falso'
        else:
            return 'não é possível verificar se o texto é falso'
    else:
        return 'verdadeiro'


# Carregar o DataFrame com textos verdadeiros e seus links
input_file_path = './df_combined.csv'
df_combined_loaded = pd.read_csv(input_file_path)
df_true = df_combined_loaded[df_combined_loaded['label'] == 'verdadeira']

# reduzir o dataframe true apenas para apresentação do trabalho visando econominzar tempo
tamanho = len(df_true)//10
df_true_links = df_true.head(tamanho)

# Crie a API Flask
app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'Nenhum texto fornecido'}), 400

    result = predict_text(text, df_true_links=df_true_links)

    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)
