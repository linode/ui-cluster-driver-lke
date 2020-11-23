# ui-cluster-driver-lke

Rancher Cluster Driver UI for the [Linode Kubernetes Engine](https://www.linode.com/products/kubernetes/)

## Usage

* Install Docker on a Linode Instance, either [manually](https://www.linode.com/docs/applications/containers/how-to-install-docker-and-pull-images-for-container-deployment/) or through the [Linode Marketplace](https://www.linode.com/docs/guides/deploying-docker-with-one-click-apps/).
* Start the Rancher container. You can follow either the [Linode guide on installing Rancher](https://www.linode.com/docs/guides/how-to-deploy-kubernetes-on-linode-with-rancher-2-x/), or the [Rancher Quick Start](https://rancher.com/docs/rancher/v2.x/en/quick-start-guide/deployment/quickstart-manual-setup/).

<!-- TODO: not needed in Rancher x.x+ -->

* Add a Cluster Driver in Rancher by navigating through Global -> Tools -> Drivers -> Add Cluster Driver
  * Download URL: The URL for the driver binary (e.g. `https://github.com/linode/kontainer-engine-driver-lke/releases/download/v0.0.3/kontainer-engine-driver-lke-linux-amd64`)
  * Custom UI URL: The URL of the UI javascript (e.g. `https://github.com/linode/ui-cluster-driver-lke/releases/download/v0.0.2/component.js`)
  * Whitelist Domains: `github.com`
* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, the Linode driver and UI should show up.

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

Would you like to improve the `ui-cluster-driver-lke` module? Please start [here](https://github.com/linode/ui-cluster-driver-lke/blob/master/.github/CONTRIBUTING.md).


### Join us on Slack

For general help or discussion, join the [Kubernetes Slack](http://slack.k8s.io/) channel [#linode](https://kubernetes.slack.com/messages/CD4B15LUR).
