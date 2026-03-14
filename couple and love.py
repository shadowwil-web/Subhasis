import turtle
import time

# Create the turtle object 't'
t = turtle.Turtle()
screen = turtle.Screen()
screen.bgcolor("white")

# Draw a heart shape (centered)
t.penup()
t.goto(0, -100)
t.pendown()
t.color("red")
t.begin_fill()
t.left(50)
t.forward(133)
t.circle(50, 200)
t.right(140)
t.circle(50, 200)
t.forward(133)
t.end_fill()

# Draw the couple in the middle of the heart (more human-like)
couple_turtle = t
couple_turtle.speed(0)

def draw_person(x, y, body_color, head_color):
    # Body
    couple_turtle.penup()
    couple_turtle.goto(x, y)
    couple_turtle.pendown()
    couple_turtle.color(body_color)
    couple_turtle.width(3)
    couple_turtle.setheading(90)
    couple_turtle.forward(40)  # Body

    # Arms
    couple_turtle.right(45)
    couple_turtle.forward(20)
    couple_turtle.backward(20)
    couple_turtle.left(90)
    couple_turtle.forward(20)
    couple_turtle.backward(20)
    couple_turtle.right(45)

    # Legs
    couple_turtle.penup()
    couple_turtle.goto(x, y)
    couple_turtle.setheading(-90)
    couple_turtle.pendown()
    couple_turtle.forward(30)
    couple_turtle.right(30)
    couple_turtle.forward(20)
    couple_turtle.backward(20)
    couple_turtle.left(60)
    couple_turtle.forward(20)
    couple_turtle.backward(20)
    couple_turtle.right(30)

    # Head
    couple_turtle.penup()
    couple_turtle.goto(x, y + 40)
    couple_turtle.pendown()
    couple_turtle.color(head_color)
    couple_turtle.width(1)
    couple_turtle.begin_fill()
    couple_turtle.circle(8)
    couple_turtle.end_fill()

# Draw first person (blue shirt, peach head)
draw_person(-20, -40, "blue", "#FFDAB9")

# Draw second person (green shirt, peach head)
draw_person(20, -40, "green", "#FFDAB9")

# Hide the turtle after drawing
couple_turtle.hideturtle()

# Hold the window for 15 seconds
time.sleep(15)