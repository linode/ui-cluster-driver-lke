# ui-cluster-driver-linode

Rancher Cluster Driver UI for the [Linode Kubernetes Engine](https://www.linode.com/products/kubernetes/)

## Usage

<!-- TODO: not needed in Rancher x.x+ -->

* Add a Cluster Driver in Rancher 2.0 (Global -> Custom Drivers -> Cluster Drivers)
  * Name: Your `DRIVERNAME` (see above).
  * Download URL: The URL for the driver binary (e.g. `https://github.com/linode/kontainer-engine-driver-linode/releases/download/v1.0.0/kontainer-engine-driver-linode-v1.0.0-linux-amd64.tar.gz`)
  * Custom UI URL: The URL you uploaded the `dist` folder to, e.g. `https://github.com/linode/ui-cluster-driver-linode/releases/download/v1.0.0/component.js`)
* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, your driver and custom UI should show up.

## Setup

These steps are still useful in Rancher v2.0.x where the Linode Node Driver is not already included.

* Add a Machine Driver in Rancher 2.0.x (Global -> Node Drivers)
  * Name: `Linode`
  * Download URL:

    `https://github.com/linode/docker-machine-driver-linode/releases/download/v0.1.7/docker-machine-driver-linode_linux-amd64.zip`

  * Custom UI URL (Note: v0.3.0-alpha.1 and greater require Rancher 2.2.3+ ):

    `https://linode.github.io/rancher-ui-driver-linode/releases/v0.2.0/component.js`

  * Checksum

    `faaf1d7d53b55a369baeeb0855b069921a36131868fe3641eb595ac1ff4cf16f`

  * Whitelist Domains:

    `linode.github.io`

* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, the driver and custom UI should show up.

## Development

This package contains a small web-server that will serve up the custom driver UI at `http://localhost:3000/component.js`.  You can run this while developing and point the Rancher settings there.

* `npm start`
* The compiled files are viewable at <http://localhost:3000>.
* Do not use the `model.linodeEngineConfg` signature to access your driver config in the template file, use the `config` alias that is already setup in the component

## Building

For other users to see your driver, you need to build it and host the output on a server accessible from their browsers.

* `npm run build`
* Copy the contents of the `dist` directory onto a webserver.
  * If your Rancher is configured to use HA or SSL, the server must also be available via HTTPS.


### Contribution Guidelines

Would you like to improve the `ui-cluster-driver-linode` module? Please start [here](https://github.com/linode/ui-cluster-driver-linode/blob/master/.github/CONTRIBUTING.md).


### Join us on Slack

For general help or discussion, join the [Kubernetes Slack](http://slack.k8s.io/) channel [#linode](https://kubernetes.slack.com/messages/CD4B15LUR).
