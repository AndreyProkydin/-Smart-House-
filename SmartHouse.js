//Головний класс Розумний Дім
//Методи:addDevice, getDevice, getDeviceByName, removeDevice,  turnOffAllDevices
class SmartHouse {
    constructor() {
      this.devices = [];
    }
  
    addDevice(device) {
      this.devices.push(device);
    }
    getDevice() {
      return this.devices
    }
    getDeviceByName(deviceName) {
      return this.devices.find(device => device.name === deviceName)
    }
    removeDevice(device) { 
      const index = this.devices.indexOf(device);
      if (index !== -1) {
        this.devices.splice(index, 1);
        console.log(`${this.devices} Device remove`);
      } else {
        console.log(`${this.devices} Device not found`);
      }
    }
    turnOffAllDevices() { // Асинхронне програмування, викнення всіх девайсів протягом 10 секунд після вклику команди.
      console.log('\nTurning off all device in 10 seconds...\n');
      setTimeout(() => {
        this.devices.forEach(device => device.turnOff());
      }, 10000); 
    }
  }
//Класс Девайсів для їх активації за допомоги методів turnOn/Off
  class Device {
    constructor(name) {
      this.name = name;
      this.isActive = false;
    }
  
    turnOn() {
      this.isActive = true;
      console.log(`${this.name} is activated.`);
    }
  
    turnOff() {
      this.isActive = false;
      console.log(`${this.name} is deactivated.`);
    }

  }
  //Класс Ламп з можливістю налаштування яскравості setBrightness
  class Lamp extends Device {
    constructor(name) {
      super(name);
      this.brightness = 0;
    }
  
    setBrightness(brightness) {
      this.brightness = brightness;
      console.log(`${this.name} brightness is set to ${brightness}.`);
    }
  }
    //Класс Безпеки(Активована/Вимкнена)
  class Alarm extends Device {
    constructor(name) {
      super(name);
    }
  }
    //Класс Жалюзі (Методи Raise,Lower,changelLiftLevel)
  class Blinds extends Device {
    constructor(name, liftLevel = 0) {
      super(name);
      
      this.liftLevel = liftLevel;
    }
    raise() {
        this.changelLiftLevel(100);
    }
    lower() {
        this.changelLiftLevel(0);
    }
    changelLiftLevel(newLiftLevel) {
        this.liftLevel = newLiftLevel;
        console.log(`${this.name} blinds lift level set to ${newLiftLevel}.`);
    }
  }
    //Класс TV (setVolume,setChannel(+ перевірка на введений канал та збереження в lastChannel))
  class TV extends Device {
    constructor(name) {
      super(name);
      this.volume = 0;
      this.channel = this.lastChannel;
      this.lastChannel = -1;
    }
  
    setVolume(volume) {
      this.volume = volume;
      console.log(`${this.name} volume is set to ${volume}.`);
    }
  
    setChannel(channel) {
      if (channel <= 0) {
        console.log(`${this.name} Invalid channel.`);
        return;
      }
  
      this.lastChannel = this.channel;
      this.channel = channel;
      console.log(`${this.name} channel is set to ${channel}.`);
    }
  
    turnOn() {
      super.turnOn();
      
      if (this.lastChannel !== -1) {
        this.setChannel(this.lastChannel);
        console.log(`${this.name} last channel ${this.lastChannel}.`);
      }
    }
  }
  //Класс Чайнику 
  class Kettle extends Device {
    constructor(name) {
      super(name);
      this.isBoiling = false;
    }
  
    boil() {
      this.isBoiling = true;
      console.log(`${this.name} is boiling.`);
      setTimeout(() => {
        this.stopBoiling();    //Симуляція тривалості кипіння
      }, 5000); //Виклик методу stopBoiling() через 5 секунд
    }

    stopBoiling() {
      this.isBoiling = false;
      console.log(`${this.name} stopped boiling.\n`);
    }
    
  }
  //Створення розумного будинку та додавання його компонентів
  const smartHouse = new SmartHouse();
  smartHouse.addDevice(new Lamp('Living Room Lamp'));
  smartHouse.addDevice(new Alarm('Home Alarm'));
  smartHouse.addDevice(new Blinds('Bedroom Blinds'));
  smartHouse.addDevice(new TV('TV'));
  smartHouse.addDevice(new Kettle('Kitchen Kettle'));
// Тестування
  smartHouse.getDeviceByName('Living Room Lamp').turnOn();
  smartHouse.getDeviceByName('Living Room Lamp').setBrightness(50);

  smartHouse.getDeviceByName('Home Alarm').turnOn();// Home Alarm is activated.

  

  smartHouse.getDeviceByName('Bedroom Blinds').raise(); // Bedroom Blinds is opened.
  smartHouse.getDeviceByName('Bedroom Blinds').changelLiftLevel(35); // Bedroom Blinds is closed.

  smartHouse.getDeviceByName('TV').turnOn();
  smartHouse.getDeviceByName('TV').setVolume(20);
  smartHouse.getDeviceByName('TV').setChannel('BBC');
  smartHouse.getDeviceByName('TV').setChannel(-2); // Living Room TV is activated.


  smartHouse.getDeviceByName('Kitchen Kettle').turnOn();
  smartHouse.getDeviceByName('Kitchen Kettle').boil(); // Kitchen Kettle is boiling.

  smartHouse.getDeviceByName('Home Alarm').turnOff(); // Home Alarm is deactivated.
  smartHouse.getDeviceByName('TV').turnOn();
  smartHouse.turnOffAllDevices();