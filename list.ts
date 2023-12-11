
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
    const EMPTY_LIST = "Operation can't be performed on empty list";
    const INVALID_RANGE = "Start value must not exceed end value";

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
         * @param value Value to check
         * @returns true if value is an instane of `List`
         */
        static isList(value: any): value is List {
            return value instanceof List;
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
         * Check if index is valid (internal method)
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param index Index to check
         * @returns index if index is valid
         */
        private verify(index: Integer): Integer {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            if (this.inRange(index)) throw OUT_OF_RANGE;
            return index;
        }

        /**
         * Get item at index from list
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param T generic type to cast to
         * @param index Index to get
         * @returns Item at index cast to T type
         */
        get<T>(index: Integer): T {
            index = this.verify(index);
            return this.items[index] as T;
        }

        /**
         * Get random item from list
         * Throws INVALID_INDEX or INVALID_RANGE for invalid start or end arguments
         * Throws INVALID_RANGE if start value is higher than end value
         * Throws EMPTY_LIST if list is empty
         * @param start (optional) start of range; inclusive (defaults to 0)
         * @param end (optional) end of range; inclusive (defaults to length of list - 1)
         * @returns Random item from list within range
         */
        random(start?: number, end?: number): any {
            start = this.verify(start || 0);
            end = this.verify(end || this.length - 1);

            if (end < start) throw INVALID_RANGE;
            if (this.isEmpty()) throw EMPTY_LIST;
            return this.get(Math.randomRange(start, end));
        }

        /**
         * Modify operations
         * Methods that add, change or remove list items
         */

        /**
         * Set item at given index to value
         * Throws INVALID_INDEX if index is not a non-negative integer
         * @param T generic type to cast to
         * @param index Index at which value is set
         * @param value Element to set at index
         */
        set<T>(index: Integer, value: T): void {
            if (!isInteger(index) || index < 0) throw INVALID_INDEX;
            this.items[index] = value;
        }

        /**
         * Delete item at index
         * Throws INVALID_INDEX if index is not a non-negative integer
         * Throws OUT_OF_RANGE if index is not in list range
         * @param index Index to delete value at
         */
        delete(index: Integer): void {
            index = this.verify(index);
            delete this.items[index];
        }

        /**
         * Add value to end of list
         * @param value Value to append to list end
         */
        push(value: any): void {
            this.set(this.length, value);
        }

        /**
         * List operations
         * Methods that return list data or performs
         * operations on entire lists
         */

        /**
         * Check if index is in range of list
         * Throws NON_INTEGER_INDEX if index is not an integer
         * @param index Index to compare
         * @returns true if index is above 0 and below the length of the list
         */
        inRange(index: Integer): boolean {
            if (!isInteger(index)) throw NON_INTEGER_INDEX;
            return index >= 0 && index < this.length;
        }

        /**
         * Check if list is empty
         * @returns true if list has no items
         */
        isEmpty(): boolean {
            return this.length === 0;
        }
    }

}