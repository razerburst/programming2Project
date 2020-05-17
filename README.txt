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
18/05/20
But realistically it should be completed at least a day or two before then so that we can fix any problems that may arise before the deadline.

Features implemented (so far):
-For the ridgeplots, the waves are scaled up greater towards their centres. Instead of there being a sharp increase in scale (from smallScale, 3, to bigScale, 40), it is now more gradual.
-Hue added for the ridgeplots
-Circle visualiser created
-Created two resizable menus with slider and button classes
-

Plans for final project:
-The parameters for each wave are randomised, dynamically changing graphics
-Wave less jagged, more sine-wave like
-Add colour gradient to make it look better
-Randomly generated flowers on the screen with colour depending on amplitude and how spread depending on pitch, periodically change position
-

Contingency plan:
Compromise complexity for feasibility.


Appendix/logs:
Repo link: https://github.com/razerburst/programming2Project/commit/c2c7b017e0325d9d71d07e4a7feb0ad3307f0d08

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

Resources used:
https://p5js.org/reference/#/p5.FFT
https://p5js.org/reference/ in general
Daniel Shiffman (The Coding Train) on YouTube