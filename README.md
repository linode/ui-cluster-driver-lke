# ui-cluster-driver-linode

Rancher Cluster Driver UI for the [Linode Kubernetes Engine](https://www.linode.com/products/kubernetes/)

## Usage

<!-- TODO: not needed in Rancher x.x+ -->

* Add a Cluster Driver in Rancher 2.0 (Global -> Custom Drivers -> Cluster Drivers)
  * Name: Your `DRIVERNAME` (see above).
  * Download URL: The URL for the driver binary (e.g. `https://github.com/linode/kontainer-engine-driver-linode/releases/download/v0.0.1/kontainer-engine-driver-linode-linux-amd64`)
  * Custom UI URL: The URL you uploaded the `dist` folder to, e.g. `https://github.com/linode/ui-cluster-driver-linode/releases/download/v0.0.1/component.js`)
  * Whitelist Domains: `github.com`
* Wait for the driver to become "Active"
* Go to Clusters -> Add Cluster, your driver and custom UI should show up.

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
