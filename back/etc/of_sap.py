
import csv
import os
# import pymysql
# from datetime import datetime, timedelta
# from threading import Timer
# import mysql.connector
from mysql.connector import connect, Error

try:
    # Connect to the database
    connection = connect(host='localhost',
                                 user='root',
                                 password='',
                                 database='db_etc')

    path = 'C:\\Users\\AmirRekhis\\chakra\\back\\etc'
    all_csv_files = [
        os.path.join(os.path.dirname(__file__), f) for f in os.listdir(path) if f.endswith('.csv')
        ]

    latest_file = max(all_csv_files, key=os.path.getctime)
    # print(latest_file)
    # print(os.path.getctime(all_csv_files[0]))
    
    latest_file = max(all_csv_files, key=os.path.getctime)
    full_path = latest_file[:-4]
    name = full_path.split('\\')[-1]
    val = name.split("_")
    # name = latest_file[:-4]
    # val = name.split("_")

    with open(latest_file) as csv_file:
        csvfile = csv.reader(csv_file, delimiter=';')
        # print(list(csvfile)[-1])
        all_value = []
        for row in csvfile:
            print(row)
            value = (val[0], val[2], val[1], row[15])
            all_value.append(value)

        cursor = connection.cursor()

        sql = "INSERT INTO ofs (`OF`, `Modele`, `Client`, `Qte_a_monter`) VALUES (%s,%s,%s,%s)"
        cursor.execute(sql, value)

        connection.commit()

except Error as e:
    print(e)

finally:
    # close the database connection using close() method.
    connection.close()
