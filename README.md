# elements-of-cteig
Repo holding source for a simple website to better display CTE related information.


#### This section indexes all classes and IDs that are applied site-wide

##### Primary Markup elements

|Component                    |Description
|:----------------------------|:----------------------------------|
|`.element-wrapper`           |Container for all topics.
|`.element-box`               |Box-shaped element showing how many sections are related to each topic.
|`#title-divider`             |Largest section of the title of the page.
|`#sub-header`                |Smallest section of the title.
|`.details`                   |Primary class marking the section in an `.element-card` where the details of the card will be shown.
|`.primary`                   |The primary section in a `.details` section, containing the topics.
|`.topics`                    |Class to apply styles exclusively to topics
|`#search-filter-container`   |The single containing element for all search filter tabs.
|`.search-filter-tab`         |Styles applied to all filter tabs.
|`#tab-marker`                |The marker for the current selected tab (refer to selectedTab of <NavBar />)

#### Sub classes

|Component            |Description
|:--------------------|:----------------------------------|
|`.noscroll`          |A class applied to a encompassing element that will prohibit scrolling within.
|`.generic`           |Delimiting class for the generic ripple <Responder /> element.
|`.ripple`            |Core class denoting a ripple element.
|`.animating`         |The animating state of an element. Most likely a ripple.
|`.active`            |Class applying styles to an `.element-card` only in it's active (expanded) state.
|`.small`             |[Depreciated] Denotation of a small `ul` element in `.details`
|`.checked`           |The checked state of a checkbox
