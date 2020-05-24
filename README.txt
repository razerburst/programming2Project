# programming2Project
Music visualiser

Tasks:
What needs to be done?
    1. Plan an idea for the final project extension (2-3 additional extensions, two of medium complexity and one quite complex)
    2. Implement the extension for the audio visualiser:
    
    Part 1:
        1. Plot where and how big to draw the cascading lines.
        2. Make an array of line objects.
        3. Draw the lines to the screen every frame, then clear the screen and decrease the y coordinate of the lines.
        4. If a line reaches the top of the plot, remove it from the array.
    Part 2:
        1. Add animation:
        2. Change line into wave using vertices in the beginShape() endShape() functions.
        3. Map the Y position of the vertex to be within a certain scale.
        4. Increase/decrease the y position.
    
How will we know it's done?
    1. Idea choices may be revised once or twice, but the choices will be noted in the logs. Once my partner and I agree on an idea, we will write it down.
    2. The visualisation should work and look as it does in the video.
    3. The changes will be improvements, so maybe making it look better or adding a little more functionality. We will decide on 1 or 2 things to improve.
    
Who is responsible?
    1. We don't both need to come up with an idea, but if one of us disagrees with an idea then the person should suggest another.
    2. We will split the tasks in some systematic way, and we are both responsible for helping each other.
    3. We should both add improvements individually.

Can it be done in the available time?
Considering the setbacks encountered as a result of personal circumstances, we will need to compromise on either the complexity or the number of extensions
so that it can be completed in the available time.

When must it be completed?
11/05/20
But realistically it should be completed at least a day or two before then so that we can fix any problems that may arise before the deadline.

Plans for final project:
-The parameters for each wave are randomised, dynamically changing graphics
-Wave less jagged, more sine-wave like
-Add colour gradient to make it look better
-Randomly generated flowers on the screen with colour depending on amplitude and how spread depending on pitch, periodically change position

Contingency plan:
Compromise complexity for feasibility.

Appendix/logs:
Repo link: https://github.com/razerburst/programming2Project

Week 9:
Tasks achieved:
    -Plan of extensions made, rough timeline
Tasks not achieved/ problems encountered:
    -
Tasks to be completed for next week:
    -
Week 10:
Tasks achieved:
    -Plan of extensions made
Tasks not achieved/ problems encountered:
    -
Tasks to be completed for next week:
    -

Features implemented (so far):
-For the ridgeplots, the waves are scaled up greater towards their centres. Instead of there being a sharp increase in scale (from smallScale, 3, to bigScale, 40), it is now more gradual.
-Hue added for the ridgeplots
-flowers visualiser created
-Circle visualiser created
-Created two resizable menus with slider and button classes

Features that were going to be implemented:
-visualisation where bars rise from the bottom of the screen that "kick" a ball around the screen
-types of flowers for the flowers visualisation

Code was structured using OOP. Each object to be rendered to the screen was broken down into smaller objects, which were given relevant methods.
E.g. the menu was broken down into the menu box and the buttons inside it. Decomposition (factoring) was used to break down methods and classes into smaller and more workable tasks.

Challenges faced, apart from personal circumstances, include converting the concepts and ideas for the visualisations into computable "animations", and figuring out what part of the
visualisation to link the amplitude values to. It was also difficult to create the resize methods for the menus at first, because it was hard to calculate how much exactly to 
reduce the size of the menus and buttons by when the width and height of the screen were both reduced. It was also difficult to translate the dimensions illustrator menu designs to code.
The ridgeplots extension also gave us some trouble. Figuring out how much to "tune" the colours, hues and different parameters by to create a somewhat aesthetically pleasing effect required
lots of testing.

If we were to do this again, we would definitely plan designs for the visualisations using a graphics rendering application like illustrator or photoshop before coding so that we would have some way of 
visualising it in our heads before translating that to code. We didn't do this due to time constraints, but I think we could prioritise doing that for the next time.

Resources used:
https://p5js.org/reference/#/p5.FFT
https://p5js.org/reference/ in general
Daniel Shiffman (The Coding Train) on YouTube