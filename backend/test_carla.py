import glob
import os
import sys
try:
    sys.path.append(glob.glob('backend/carla-*%d.%d-%s.egg' % (
        sys.version_info.major,
        sys.version_info.minor,
        'win-amd64' if os.name == 'nt' else 'linux-x86_64'))[0])
except IndexError:
    pass
import carla
print(os.name)
actor_list = []

try:
    client = carla.Client("localhost", 2000)
    print(client)
finally:
    for actor in actor_list:
        actor.destroy()
    print("All cleaned up!")