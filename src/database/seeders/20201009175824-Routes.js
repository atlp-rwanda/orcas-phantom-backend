module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Routes',
    [
      {
        name: 'Remera - Town',
        originID: 1,
        destinationID: 2,
        busStops: [1, 2],
        routeData: JSON.stringify({
          routes: [
            {
              weight_name: 'auto',
              weight: 886.67,
              duration: 628.349,
              distance: 7989.201,
              legs: [
                {
                  steps: [],
                  admins: [
                    {
                      iso_3166_1_alpha3: 'USA',
                      iso_3166_1: 'US'
                    }
                  ],
                  duration: 628.349,
                  distance: 7989.201,
                  weight: 886.67,
                  summary: 'Martin Luther King Drive West, I 75 South'
                }
              ],
              geometry: {
                coordinates: [
                  [
                    -84.51825,
                    39.13385
                  ],
                  [
                    -84.51931,
                    39.133488
                  ],
                  [
                    -84.520226,
                    39.133648
                  ],
                  [
                    -84.520035,
                    39.135326
                  ],
                  [
                    -84.520782,
                    39.135548
                  ],
                  [
                    -84.524315,
                    39.139366
                  ],
                  [
                    -84.525887,
                    39.140133
                  ],
                  [
                    -84.528633,
                    39.139671
                  ],
                  [
                    -84.531898,
                    39.140041
                  ],
                  [
                    -84.534721,
                    39.138168
                  ],
                  [
                    -84.535614,
                    39.138264
                  ],
                  [
                    -84.535591,
                    39.138844
                  ],
                  [
                    -84.535088,
                    39.138969
                  ],
                  [
                    -84.534668,
                    39.138687
                  ],
                  [
                    -84.533531,
                    39.136005
                  ],
                  [
                    -84.532814,
                    39.133968
                  ],
                  [
                    -84.532768,
                    39.131931
                  ],
                  [
                    -84.535248,
                    39.125717
                  ],
                  [
                    -84.535576,
                    39.119827
                  ],
                  [
                    -84.531639,
                    39.113407
                  ],
                  [
                    -84.531441,
                    39.107243
                  ],
                  [
                    -84.530067,
                    39.105377
                  ],
                  [
                    -84.527969,
                    39.104206
                  ],
                  [
                    -84.525253,
                    39.102547
                  ],
                  [
                    -84.52404,
                    39.102287
                  ],
                  [
                    -84.512009,
                    39.103931
                  ],
                  [
                    -84.511688,
                    39.10268
                  ],
                  [
                    -84.511986,
                    39.102638
                  ]
                ],
                type: 'LineString'
              }
            }
          ],
          waypoints: [
            {
              distance: 57.539,
              name: 'College Court',
              location: [
                -84.51825,
                39.13385
              ]
            },
            {
              distance: 16.054,
              name: 'East 6th Street',
              location: [
                -84.511986,
                39.102638
              ]
            }
          ],
          code: 'Ok',
          uuid: '_QZJhszWtdv_wGA9DyLQIXhXVx7iK1c0R5OzCM7VdPt3OeK8h9cHMw=='
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface,) => queryInterface.bulkDelete('Routes', null, {}),
};
