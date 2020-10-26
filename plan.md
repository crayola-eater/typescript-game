#### What needs to be done.

# Position (data structure)

    { x: 0, y: 0 }

# Delta (data structure)

    { deltaX: 0, deltaY: 0 }

# Shape

    Purpose:
        Encapsulates model/data for something's shape.
    State:
        Position
        Height, Width
        Getters (top left, top right, ...)
    Behaviour
        CollidesWith
        ExtendsBeyond

# MovableShape

    Purpose:
        Extends Shape
    Behaviour:
        MoveBy
        MoveTo?
        Move?

# Controls

    Purpose:
        To keep track of input (key presses, mouse clicks, etc.) received outside of the class
        and whether something is currently pressed.
    State:
        Inputs:
            WASD = KeyboardEvent
            Mouse clicks = MouseEvent
    Behaviour:
        OnInput
            Change the state of whether something is pressed
        OnRelease
            Change the state when a control is pressed.

# Health

    Purpose:
        Encapsulates model/data for something's health.
    State:
        CurrentHealth
        MaxHealth
    Behaviour
        ChangeHealthBy
        ChangeHealthTo

# Shot

    Purpose:
        Represents a shot
    State:
        Damage
        To
        From?
    Components:
        MovableShape

# Shooter

    Purpose:
        Encapsulate data for something that can shoot
    State:
        shotsFired
    Behaviour:
        shoot
        removeShot

# Obstacles

    Components:
        Shape
        Health

# HumanPlayer

    Components:
        MovableShape
        Health
        Controls
        Shooter
    Behaviour:
        Move
        Shoot

# ComputerPlayer

    Components:
        MovableShape
        Health
        Shooter
    Behaviour:
        Move
        Shoot
