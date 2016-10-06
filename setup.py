"""Setup for building_simulation XBlock."""

import os
from setuptools import setup


def package_data(pkg, roots):
    """Generic function to find package_data.

    All of the files under each of the `roots` will be declared as package
    data for package `pkg`.

    """
    data = []
    for root in roots:
        for dirname, _, files in os.walk(os.path.join(pkg, root)):
            for fname in files:
                data.append(os.path.relpath(os.path.join(dirname, fname), pkg))

    return {pkg: data}


setup(
    name='building_simulation-xblock',
    version='0.1',
    description='building_simulation XBlock',   # TODO: write a better description.
    license='MIT',          # TODO: choose a license: 'AGPL v3' and 'Apache 2.0' are popular.
    packages=[
        'building_simulation',
    ],
    install_requires=[
        'XBlock',
    ],
    entry_points={
        'xblock.v1': [
            'building_simulation = building_simulation:BuildingSimulationXBlock',
        ]
    },
    package_data=package_data("building_simulation", ["static", "public"]),
)
