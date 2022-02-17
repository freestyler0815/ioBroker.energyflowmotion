'use strict';

/*
 * Created with @iobroker/create-adapter v1.26.3
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');

// Load your modules here, e.g.:
// const fs = require("fs");

class Energyflowmotion extends utils.Adapter {

    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    constructor(options) {
        super({
            ...options,
            name: 'energyflowmotion',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        // this.on('objectChange', this.onObjectChange.bind(this));
        // this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    async onReady() {
        // Initialize your adapter here

        // Reset the connection indicator during startup
        this.setState('info.connection', false, true);

        // The adapters config (in the instance object everything under the attribute "native") is accessible via
        // this.config:
        //this.log.info('config option1: ' + this.config.option1);
        //this.log.info('config option2: ' + this.config.option2);

        /*
        For every state in the system there has to be also an object of type state
        Here a simple template for a boolean variable named "testVariable"
        Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
        */

        // Current Powerstates
        // Channel
        await this.setObjectNotExistsAsync('CurrentPower', {type: 'channel', common: { name: 'CurrentPower'}, native: {},});
        // States        
        await this.setObjectNotExistsAsync('CurrentPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('CurrentPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('CurrentPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('CurrentPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('CurrentPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('CurrentPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KW' , role: 'value.power', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('CurrentPower.GlobalBatState', {type: 'state', common: {type: 'number', name: 'GlobalerBatteriestatus', role: 'value', read: true,  write: true,}, native: {},});                

        // Historical Powerstates
        // Day
        // Channel
        await this.setObjectNotExistsAsync('TodayPower', {type: 'channel', common: { name: 'TodayPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('TodayPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('TodayPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('TodayPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('TodayPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});        

        // LastDay
        // Channel
        await this.setObjectNotExistsAsync('LastdayPower', {type: 'channel', common: { name: 'LastdayPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('LastdayPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastdayPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastdayPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastdayPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});

        // Month
        // Channel
        await this.setObjectNotExistsAsync('MonthPower', {type: 'channel', common: { name: 'MonthPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('MonthPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('MonthPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('MonthPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('MonthPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});

        // LastMonth
        // Channel
        await this.setObjectNotExistsAsync('LastMonthPower', {type: 'channel', common: { name: 'LastMonthPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('LastMonthPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastMonthPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastMonthPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastMonthPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});

        // Year
        // Channel
        await this.setObjectNotExistsAsync('YearPower', {type: 'channel', common: { name: 'YearPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('YearPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('YearPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('YearPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('YearPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});

        // LastYear
        // Channel
        await this.setObjectNotExistsAsync('LastYearPower', {type: 'channel', common: { name: 'LastYearPower'}, native: {},});
        // States
        await this.setObjectNotExistsAsync('LastYearPower.PvPower', {type: 'state', common: {type: 'number', name: 'PvErzeugung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastYearPower.Load', {type: 'state', common: {type: 'number', name: 'Verbrauch', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});
        await this.setObjectNotExistsAsync('LastYearPower.Export', {type: 'state', common: {type: 'number', name: 'Einspeisung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.Import', {type: 'state', common: {type: 'number', name: 'Bezug', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.BatDischarge', {type: 'state', common: {type: 'number', name: 'BatterieEntladung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.BatCharge', {type: 'state', common: {type: 'number', name: 'BatterieLadung', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.SelfConsumption', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch kWh', unit: 'KWh' , role: 'value.power.consumption', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.SelfConsumptionQuota', {type: 'state', common: {type: 'number', name: 'Eigenverbrauch Anteil', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.AutarchyQuota', {type: 'state', common: {type: 'number', name: 'Autarkie', unit: '%' , role: 'value', read: true,  write: true,}, native: {},});        
        await this.setObjectNotExistsAsync('LastYearPower.Date', {type: 'state', common: {type: 'number', name: 'Datum', role: 'value.time', read: true,  write: true,}, native: {},});

        // In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.

        // this.subscribeStates('testVariable'); <--- Ausfüllen

        // You can also add a subscription for multiple states. The following line watches all states starting with "lights."
        // this.subscribeStates('lights.*');
        // Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
        // this.subscribeStates('*');

        /*
            setState examples
            you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
        */
        // the variable testVariable is set to true as command (ack=false)
        //await this.setStateAsync('testVariable', true);

        // same thing, but the value is flagged "ack"
        // ack should be always set to true if the value is received from or acknowledged from the target system
        //await this.setStateAsync('testVariable', { val: true, ack: true });

        // same thing, but the state is deleted after 30s (getState will return null afterwards)
        //await this.setStateAsync('testVariable', { val: true, ack: true, expire: 30 });

        // examples for the checkPassword/checkGroup functions
        let result = await this.checkPasswordAsync('admin', 'iobroker');
        this.log.info('check user admin pw iobroker: ' + result);

        result = await this.checkGroupAsync('admin', 'admin');
        this.log.info('check group user admin group admin: ' + result);
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     * @param {() => void} callback
     */
    onUnload(callback) {
        try {
            // Here you must clear all timeouts or intervals that may still be active
            // clearTimeout(timeout1);
            // clearTimeout(timeout2);
            // ...
            // clearInterval(interval1);

            callback();
        } catch (e) {
            callback();
        }
    }

    // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
    // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
    // /**
    //  * Is called if a subscribed object changes
    //  * @param {string} id
    //  * @param {ioBroker.Object | null | undefined} obj
    //  */
    // onObjectChange(id, obj) {
    //     if (obj) {
    //         // The object was changed
    //         this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
    //     } else {
    //         // The object was deleted
    //         this.log.info(`object ${id} deleted`);
    //     }
    // }

    /**
     * Is called if a subscribed state changes
     * @param {string} id
     * @param {ioBroker.State | null | undefined} state
     */
    onStateChange(id, state) {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
        } else {
            // The state was deleted
            this.log.info(`state ${id} deleted`);
        }
    }

    // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.message" property to be set to true in io-package.json
    //  * @param {ioBroker.Message} obj
    //  */
    // onMessage(obj) {
    //     if (typeof obj === 'object' && obj.message) {
    //         if (obj.command === 'send') {
    //             // e.g. send email or pushover or whatever
    //             this.log.info('send command');

    //             // Send response in callback if required
    //             if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
    //         }
    //     }
    // }

}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export the constructor in compact mode
    /**
     * @param {Partial<utils.AdapterOptions>} [options={}]
     */
    module.exports = (options) => new Energyflowmotion(options);
} else {
    // otherwise start the instance directly
    new Energyflowmotion();
}