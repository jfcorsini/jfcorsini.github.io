---
layout: post
title:  "Learning about Machine Learning"
excerpt: "A short review of what I learned with Andrew Ng's Machine Learning course"
end_line: "Hope you learned something new!"
tags: 
    - "machine_learning"
    - "matlab"
    - "neural_networks"
date:   2019-04-14
image: "/images/ai_robot.jpg"
---

## Motivation

Learning how to make a simple game with Unity was a fun experience. I got to play with some graphics and with C#, something I haven't done before. But for this month I decided to learn something different, which is to learn more about Machine Learning.

Nowadays this is a topic that is very discussed and I felt like I should understand a bit deeper on that topic since I am working with Software Development. Therefore, I decided to take part in [Andrew's Ng Machine Learning course](https://www.coursera.org/learn/machine-learning) to learn more about the topic. This course is divided into 11 weeks of work, but I have only worked through the first five weeks, which will be the topic of this post.

## The course

While normally most of the Machine Learning courses use Python as the main programming language to write the algorithms, this course uses GNU Octave, which is a programming language mostly compatible with Matlab. This was a nice extra in order for me to keep up with Matlab programming language, which was a while since I didn't use it.

Each week has a set of videos explaining some theory and algorithms, together with some quizzes about those topics and finally a big assignment that should be solved with Octave. This is really this course really shines in my opinion: providing a big dataset of a real problem and helping you to find a solution. On the next sessions, I will try describing 3 types of problems that were solved with Machine Learning algorithms.

## Linear regression

One of the first problems and examples used on this course relates to trying to find out how much is a house worth. For that, we get a long list of training that where for each house, we have the total size, number of rooms, size of the garden and other information, together with the price that this house was sold. With that information, we need to build a model, i.e. a linear function, that can provide a price for any inputs and that has the smallest error if compared to the real training data. To solve this problem, we can use Linear Regression algorithms!

The image below shows one example of a curve that could be created if the price of houses would only depend on a single input, so it is easy to show in a graphical way.

![linear_regression](/images/linear_regression.png){:width="75%" .center-image}
<center><small>Linear Regression</small></center>

I always this feeling that Machine Learning will have some kind of 'magic' or something special that will allow algorithms to learn. I couldn't have been more wrong! Andrew's Ng course has a big focus on theory and mathematics, and this section was able to show me that we can actually fit a really good curve there just by using math.

## Multi-Classification

The second problem we had is to identify whether a tumor is benign or malignant, based on a dataset that described a list of tumors with, for example, size and patient age and what were the results of that tumor. So for instance, is it possible that given a new patient's age and tumor size, to say how likely is it that this tumor is benign? Using Multi-Classification is the answer!

The image below shows an example of what is done with a lot of math and input data, for different inputs (X1 and X2):

![multi_classification](/images/multi_classification.png){:width="75%" .center-image}
<center><small>Multi-Classification</small></center>

So basically what we want is to create a formula that will describe a region based on the inputs. Just as on the Linear Regression, this is done by lots of math and formulas. The fun part here is really to understand how is your data and how can you use Matlab/Octave the best way to achieve good performance, i.e. no for loops but actually using matrix operations.

## Neural Networks

Although it sounds like something super advanced, Neural Network was already a topic earlier in this course. The problem, in this case, is to try to identify what number is drawn based on an image of 20x20 pixels. In a way, this could be done with Linear Regression, but we would then have a problem with 400 different inputs (20 x 20 pixels) and this would probably start to get a bit slow.

I'm not gonna go deep here in this blog post, since a lot about Neural Networks [can be found online](https://becominghuman.ai/basics-of-neural-network-bef2ba97d2cf), but the main idea is that this neural network will have an input layer of 400 items, a hidden layer in between and an output layer with 10 items, so that its output will say which integer is drawn.

On this exercise, there were 5000 images of handwritten numbers and its real value, so the goal was to train a neural network to create the best "weights" that allow this. The image below shows a bit of what was done and how the layers will look like.

![neural_network](/images/neural_network.png){:width="75%" .center-image}
<center><small>Neural Network</small></center>

Once the models were trained, we could run all the inputs to the neural network and realized that around 95% of the inputs would get the correct output. I'd say this is a nice number, but for sure the next chapters of this course will teach how to improve it :)

## Conclusion

It was really fun to learn and implement those different algorithms, especially Neural Networks. I learned a lot of different things that I didn't know before and was happy to see the final implementation of that Neural Network.

So if you are curious about Machine Learning and want to use some math to solve problems, I would definitely recommend this course!
