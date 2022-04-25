# Installation

To build and install the custom Jupyter widget, open terminal and run the following:


### Install npm packages

This only needs to be done each time a new npm pacakge is installed. Otherwise, it is safe to skip.

```
npm install
```

### Build front-end and update Jupyter widget

This needs to be run each time the front-end Jupyter widget is changed:

```
npm run build
cd ReactWidget/js
npm install
npm run prepublish
cd ..
pip install -e .
cd ..
jupyter nbextension install --py --symlink --sys-prefix ReactWidget
jupyter nbextension enable ReactWidget --py --sys-prefix
```

# Using Jupyter Notebook

To create a new Jupyter notebook, navigate to the folder `notebooks`, and run `jupyter notebook` in terminal to open the interface.

Create a new notebook here. DO NOT share notebooks between multiple collaborators as it interferes with git.

### Using the Jupyter widget

If you are developing or using the Jupyter widget in the notebook, create a new python cell and run:

```
from JupyterWidget install Test

data = [{...}, ...]

Test( data )
```

# Using Storybook

For rapid development of the Jupyter widget front-end, testing can be done using storybook to avoid installing and uninstalling the widget for each change.

To run storybook, open terminal and run the following:

```
npm run storybook
```

To add or update stories, navigate to the `stories` folder and create your own storybook component.
