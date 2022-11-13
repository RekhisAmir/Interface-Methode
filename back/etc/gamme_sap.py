# from aifc import Error

import os
import csv
# import pymysql
# from datetime import datetime, timedelta
# from threading import Timer
from mysql.connector import connect, Error

try:
    # Connect to the database
    connection = connect(host='localhost',
                                 user='root',
                                 password='',
                                 database='db_etc')

    path = 'C:\\Users\\AmirRekhis\\chakra\\back\\etc'
    # all_csv_files = [f for f in os.listdir(path) if f.endswith('.csv')]
    all_csv_files = [
        os.path.join(os.path.dirname(__file__), f) for f in os.listdir(path) if f.endswith('.csv')
        ]
    latest_file = max(all_csv_files, key=os.path.getctime)
    full_path = latest_file[:-4]
    name = full_path.split('\\')[-1]
    val = name.split("_")

    with open(latest_file) as csv_file:
        csvfile = csv.reader(csv_file, delimiter=';')
        all_value = []
        for row in csvfile:
            value = (val[1], val[0], val[2], row[15], row[0], row[7], row[59], row[61] , row[4])

            all_value.append(value)
        
        # print('all_value: ', all_value)

    cursor = connection.cursor()

    sql = "INSERT INTO gamme_init (`Tiers`, `OF`, `Modele`, `Qte`, `Ligne_gamme`, `Operation_gamme`, `Tps_ope_uni`, `QTE_H` , `Machine`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.executemany(sql, all_value)

    connection.commit()

except Error as e:
    print(e)

finally:
    # close the database connection using close() method.
    connection.close()
