import pymongo

myclient = pymongo.MongoClient("mongodb+srv://dbUser:1nJXUqFZzfB90Sr8@cluster0.zanpv.mongodb.net/")

mydb = myclient["Cluster0"]
mycollection = mydb["teachers"]


print(mydb.list_collection_names())

