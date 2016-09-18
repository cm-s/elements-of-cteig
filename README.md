# elements-of-cteig
Repo holding source for a simple website to better display CTE related information.


#### This section indexes all classes and IDs that are applied site-wide

##### Primary Markup elements

|Component          |Description
|:------------------|:----------------------------------|
|.topic-wrapper     |Container for all topics.
|.topic-box         |Box-shaped element showing how many sections are related to each topic.
|#title-divider     |Largest section of the title of the page.
|#sub-header        |Smallest section of the title.

#### Sub classes

|Component          |Description
|:------------------|:----------------------------------|
|.calling           |Animating state of a .topic-box. Animation of 'jitter' applied whenever the element is activated by a random callout descriptor. Refer to JavaScript section for more information on how this works
|.pressed           |Temporary animating state applied to a .topic-box that has been clicked.
