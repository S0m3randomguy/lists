
namespace lists {

    // Integer type
    type Integer = number;
    function isInteger(value: number): value is Integer {
        return value === Math.floor(value);
    }

    // Error messages
    const NON_INTEGER_INDEX = "Index must be integer";
    const INVALID_INDEX = "Index must be non-negative integer";
    const OUT_OF_RANGE = "Index is out of list range";

    class List {
        items: {[key: number]: any};

        constructor(array?: any[]) {
            if (!array) return;
            array.forEach((value, index) => {
                this.items[index] = value;
            })
        }

        /**
         * Static methods
         */

        /**
         * Check if value is of `List` type
         * @param item Value to check
         * @returns true if item is an instane of `List`
         */
        static isList(item: any): item is List {
            return item instanceof List;
        }

        /**
         * Properties
         */
        
        /**
         * Get length of list
         * @returns Number of items in list
         */
        get length(): number {
            return Object.keys(this.items).length;
        }

        /**
         * Read operations
         * Methods that access list items
         */
        
        /**
         * Get item at given index from list
         * Throws INVALID_INDEX if the index is not a non-negative integer
         * @param T generic type to cast to
         * @param index Index to get
         * @returns item at index cast to T type
         */
        get<T>(index: Integer): T {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            return this.items[index] as T;
        }

        /**
         * Modify operations
         * Methods that add, change or remove list items
         */

        /**
         * Set item at given index to value
         * Throws INVALID_INDEX if the index is not a non-negative integer
         * @param T generic type to cast to
         * @param index Index at which value is set
         * @param value Element to set at index
         */
        set<T>(index: Integer, value: T) {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            this.items[index] = value;
        }

        /**
         * List operations
         * Methods that return list data or performs
         * operations on entire lists
         */

        /**
         * Check if index is in range of list
         * Throws NON_INTEGER_INDEX if the index is not an integer
         * @param index Index to compare
         * @returns true if index is above 0 and below the length of the list
         */
        inRange(index: Integer): boolean {
            if (!isInteger(index)) throw NON_INTEGER_INDEX;
            return index >= 0 && index < this.length;
        }
    }

}