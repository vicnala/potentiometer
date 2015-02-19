if (Meteor.isServer) {
  Meteor.publish("lineDemoData", function() {
    return lineDemo.find();
  });
  Meteor.publish("BikeData", function() {
    return TimeSeries.find();
  });


  // Meteor.publish("counts-by-room", function (roomId) {
  //   var self = this;
  //   check(roomId, String);
  //   var count = 0;
  //   var initializing = true;

  //   // observeChanges only returns after the initial `added` callbacks
  //   // have run. Until then, we don't want to send a lot of
  //   // `self.changed()` messages - hence tracking the
  //   // `initializing` state.
  //   var handle = Messages.find({roomId: roomId}).observeChanges({
  //     added: function (id) {
  //       count++;
  //       if (!initializing)
  //         self.changed("counts", roomId, {count: count});
  //     },
  //     removed: function (id) {
  //       count--;
  //       self.changed("counts", roomId, {count: count});
  //     }
  //     // don't care about changed
  //   });

  //   // Instead, we'll send one `self.added()` message right after
  //   // observeChanges has returned, and mark the subscription as
  //   // ready.
  //   initializing = false;
  //   self.added("counts", roomId, {count: count});
  //   self.ready();

  //   // Stop observing the cursor when client unsubs.
  //   // Stopping a subscription automatically takes
  //   // care of sending the client any removed messages.
  //   self.onStop(function () {
  //     handle.stop();
  //   });
  // });

  // // client: declare collection to hold count object
  // Counts = new Mongo.Collection("counts");

  // // client: subscribe to the count for the current room
  // Tracker.autorun(function () {
  //   Meteor.subscribe("counts-by-room", Session.get("roomId"));
  // });

  // // client: use the new collection
  // console.log("Current room has " +
  //             Counts.findOne(Session.get("roomId")).count +
  //             " messages.");

  // // server: sometimes publish a query, sometimes publish nothing
  // Meteor.publish("secretData", function () {
  //   if (this.userId === 'superuser') {
  //     return SecretData.find();
  //   } else {
  //     // Declare that no data is being published. If you leave this line
  //     // out, Meteor will never consider the subscription ready because
  //     // it thinks you're using the added/changed/removed interface where
  //     // you have to explicitly call this.ready().
  //     return [];
  //   }
  // });

}