# The Ableton Cookbook Academy#

## Overview ##

The Ableton Cookbook Academy is a music production course built on a custom MOOC 
platform called Flipt. The Flipt platform consists of two parts: the Course 
Theater and the Answerbase. The Course Theater is where students watch the video 
content and ask questions. The Answerbase is a Q&A forum linked to the Course Theater. 
The Answerbase allows students to upvote and downvote specific answers, as well 
as subscribe to questions whose answers they are interested in. The MOOC platform 
is built with Django, JavaScript, HTML and CSS.

The Flipt platform and all the video content were built by Anthony P. Arroyo.

## Features ##

### Course Theater ###

The Course Theater presents video material in playlist format, along with "next" 
and "previous" controls as well as "Autonext" (for playing all videos sequentially. 
The video functionality takes advantage of the YouTube API to control playback.

![Course Home](https://raw.github.com/alohagarage/alohagarage.github.com/master/static/CourseHome.png)

Conventional MOOC platforms require students to navigate to a different page in order 
to search for answers to questions or to post new questions. In the Flipt platform, 
students use an "Omnibox" beneath the video viewer to ask or find questions. 
When a student has a question about the course material, they enter it into the 
Omnibox. If a similar question has been asked, then it appears beneath the Omnibox. 
If the student's question is new, then they can enter a new question and it will 
immediately be posted to the Answerbase.

![Question From Course](https://raw.github.com/alohagarage/alohagarage.github.com/master/static/QuestionfromCourse.png)

### Answerbase ###

The Answerbase is a central location for students to ask and answer questions. 
In many ways, it functions like a simple forum where users can easily post questions 
and answer open questions. 

![Answerbase](https://raw.github.com/alohagarage/alohagarage.github.com/master/static/Answerbase.png)

The Flipt Answerbase has a few extras, though. First, users can follow questions 
which interest them. Flipt will alert them when a followed question has been 
answered or edited. 

Second, Flipt allows users to up and downvote answers to particular questions. 
This means that the most popular (authoritative) question will always be displayed 
directly underneath the question, but all answers will be displayed. This encourages 
the student community to answer one another's questions and participate in picking 
the best answers.

![Question Detail](https://raw.github.com/alohagarage/alohagarage.github.com/master/static/QuestionDetail.png)


