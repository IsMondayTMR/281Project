import glob
import os
import sys
import time
import numpy as np
import cv2

try:
    sys.path.append(glob.glob('backend/carla-*%d.%d-%s.egg' % (
        sys.version_info.major,
        sys.version_info.minor,
        'win-amd64' if os.name == 'nt' else 'linux-x86_64'))[0])
except IndexError:
    pass
import carla

actor_list = []
IM_WIDTH = 640
IM_HEIGHT = 480
# car colors
colors = {
    'blue': '17,37,103',
    'black': '44,44,44',
    'grey': '180,180,180',
    'red': '137,0,0'
}
# spawn points
spawn_points_dict = {
    'park': 54,
    'city hall': 10,
    'gas station': 67,
    'neighborhood': 87
}
distances = {
    'park': {
        'city hall': 30,
        'gas station': 35,
        'neighborhood': 20
    },
    'city hall': {
        'park': 30,
        'gas station': 10,
        'neighborhood': 20
    },
    'neighborhood': {
        'city hall': 20,
        'gas station': 10,
        'park': 20
    },
    'gas station': {
        'city hall': 10,
        'park': 35,
        'neighborhood': 10
    }
}


def process_img(image):
    i = np.array(image.raw_data)
    i2 = i.reshape((IM_HEIGHT, IM_WIDTH, 4))
    i3 = i2[:, :, :3]
    cv2.imshow("", i3)
    cv2.waitKey(1)
    return i3 / 255.0


def start_taxi(model, color, departure, destination):
    try:
        # create client
        client = carla.Client("localhost", 2000)
        client.set_timeout(5.0)

        world = client.get_world()
        map = world.get_map()
        spawn_points = map.get_spawn_points()

        # get vehicle blue print
        blueprint_library = world.get_blueprint_library()
        bp = blueprint_library.filter(model)[0]
        bp.set_attribute('color', colors[color])
        spawn_point = spawn_points[spawn_points_dict[departure]]
        vehicle = world.spawn_actor(bp, spawn_point)
        actor_list.append(vehicle)

        # create and attach camera
        cam_bp = blueprint_library.find("sensor.camera.rgb")
        cam_bp.set_attribute("image_size_x", f"{IM_WIDTH}")
        cam_bp.set_attribute("image_size_y", f"{IM_HEIGHT}")
        cam_bp.set_attribute("fov", "110")
        spawn_point = carla.Transform(carla.Location(x=-5, z=2.3))
        sensor = world.spawn_actor(cam_bp, spawn_point, attach_to=vehicle)
        actor_list.append(sensor)
        sensor.listen(lambda data: process_img(data))
        vehicle.set_autopilot(True)

        # run for xx distance
        time.sleep(distances[departure][destination])





    finally:
        for actor in actor_list:
            actor.destroy()
        print("All cleaned up!")


# start_taxi('BMW', 'red', 'neighborhood', 'park')
