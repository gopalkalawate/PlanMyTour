import openai
import langchain
import pinecone
# from langchain.document_loaders import PyPDFDirectoryLoader
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain.embeddings.openai import OpenAIEmbeddings
# from langchain_community.embeddings import OpenAIEmbeddings
from langchain_openai import OpenAIEmbeddings
# from langchain.vectorstores.pinecone import Pinecone
from langchain_community.vectorstores import Pinecone
from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from dotenv import load_dotenv 
load_dotenv()

import os

OPENAI_API_KEY = os.environ['OPENAI_API_KEY']

#reading documents
def read_doc(directory):
    file_loader = PyPDFDirectoryLoader(directory)
    documents = file_loader.load()
    return documents

#dividing into chunks
def divide(docs, chunk_size=1000, overlap=100):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=overlap)
    doc_chunks = text_splitter.split_documents(docs)
    # Extract text content from each chunk and store in a list
    chunk_texts = [chunk.page_content for chunk in doc_chunks]
    return chunk_texts

#embeding documents
def Embed(docs):
    model = OpenAIEmbeddings()
    embeddings = OpenAIEmbeddings()
    # return embeddings
    vectors = []
    for i in docs : 
        vectors.append(embeddings.embed_query(i))
    return vectors


#push embeddings on pinecone
index_name = 'citiesinfo'
def createAndInsert(vectors, city,docs): # here docs = chunks
    e = OpenAIEmbeddings()

    pc = Pinecone(os.environ['PINECONE_API_KEY'])
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric='cosine',
            spec=ServerlessSpec(
                cloud='aws',
                region='us-east-1'
            )
        )

    index = pc.Index(index_name)

    to_insert = []
    x = 1
    for i in vectors:
        to_insert.append({'id': str(x), 'values': i,'metadata' : {"text" : docs[x-1]}})
        x += 1

    index.upsert(vectors=to_insert,namespace=city)

docs = read_doc('infoFIles/') #reading docs 
dividedDocs = divide(docs)    #dividing docs in chunks
embeddings = Embed(dividedDocs) #create Embeddings
createAndInsert(embeddings,'city1',dividedDocs) #upload Embeddings