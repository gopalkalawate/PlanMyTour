import langchain
#openai imports
import openai
from langchain_openai import OpenAIEmbeddings
#pinecone imports
import pinecone
from langchain_community.vectorstores import Pinecone
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
#groq-langchain imports
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

import os
from dotenv import load_dotenv 
load_dotenv()

#api keys
OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
GROQ_API_KEY = os.environ['GROQ_API_KEY']
PINECONE_API_KEY = os.environ['PINECONE_API_KEY']

#indexname 
index_name = os.environ['INDEX_NAME'] # citiesinfo

class Utils:
    #get relevent context
    def __releventContext(prompt,city):
        pc = Pinecone(os.environ['PINECONE_API_KEY'])
        e = OpenAIEmbeddings()
        index = pc.Index(index_name)
        related = index.query(namespace=city,vector=e.embed_query(prompt),top_k=4,include_metadata=True)
        context = ""
        for i in range(len(related.matches)):
            context += related.matches[i].metadata['text']
        return context
    
    #provide context to LLM
    def __output(userPrompt,context):
        # return 0

        llm=ChatGroq(groq_api_key='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',model_name="Llama3-8b-8192",temperature=0.5) # tempreature means creativity

        prompt=ChatPromptTemplate.from_template(
            """
            Answer the questions based on the provided context only.
            Please provide the most accurate response based on the question
            <context>
            {context}
            <context>
            Questions:{question}

            """
        )

        chain = prompt|llm

        answer =  chain.invoke({
            'question' : userPrompt,
            'context'  : context
        })

        return answer
        
    @staticmethod
    def finalInputAndOutput(city,userPrompt): #you need to call just this function
        context = Utils.__releventContext(userPrompt,city)
        return Utils.__output(userPrompt,context).content





