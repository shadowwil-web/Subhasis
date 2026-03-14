import time
import sys 
def type_lyric(line,char_delay=0.065):
    for char in line:
        print(char,end='',flush=True)
        time.sleep(char_delay)
        print()
        def print_lyrics():
            lyrics=[
                "Haathon ko sambhaale mere haathon mein",
                "kaise haathon ko sambhaale mere haathon mein",
                "jab tak need na aaye in lakeeron mein",
                "baatein hon...",
                "haan...",
            ]
            delays=[2.0,1.8,2.1,2.4,1.7]
            print("arz kiya ha lyrics:\n")
            time.sleep(1.5)
            for i,line in enumerate(lyrics):
                type_lyric(line)
                time.sleep(delays[i])
            print_lyrics()
            time.sleep(0.02)